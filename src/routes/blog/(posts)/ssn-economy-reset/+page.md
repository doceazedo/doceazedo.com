---
title: "How I used Rust to soft reset the economy of my 300 GB anarchy Minecraft server"
date: "2025/06/26"
icon: "/img/grass-block.webp"
bskyPostId: "3lsk23dqwks2c"
---

<script>
	import { CloseLineSystem, SubtractLineSystem, HammerLineDesign } from "svelte-remix";
</script>

[SSN.gg](https://ssn.gg) is my Minecraft anarchy server. No plugins that limit gameplay. No resets. No rollback. The world folder is now over **300 GB**. That is mostly player data, region files, inventories, and a huge amount of metadata stored over the years.

People duped a lot of items during the server lifespan... which is fine, that is what anarchy is for. But at some point, the numbers got silly. New players had no reason to grind, as they could instantly get everything from other players or they wouldn't even stand a chance against older players.

Some players came to me with a pitch. Coffi, Cherosin and Gugibra (members of the Mrrow Gang) made a [literal presentation](https://www.youtube.com/watch?v=f5LOpbFgnX0) with slides, sources, and everything. They asked for a soft reset. Not a map wipe. Just a way to make rare items rare again.

## I've played these games before!!!

They linked me to [a post from 2b2t](https://www.2b2t.org/2023-08-14), The Oldest Anarchy Server In Minecraft™. In 2023, they did a soft economy reset too. They removed totems and crystals, and reduced stacked enchanted items to 1.

People over there got loud about it, but it makes sense to me. You can clean up the items without touching player builds. You can run a reset without anyone even noticing (until they look inside their shulkers, that is).

So I wrote a tool.

## The plugin that never was

I started out writing a Spigot plugin. I figured I could scan all loaded chunks and inventories. Read a chest, check the items, delete or modify the duped stuff.

But Minecraft world logic runs on a single thread. Every chunk load or inventory update runs on that same thread. My plugin even scanning a few chunks caused the tick rate to stall and the server to hang.

I thought about waiting a bit between scans to reduce load, but for a 300 GB+ world with tens of thousands of chunks, that still meant years of leaving the plugin running for literally **years**.

Offline player inventories are also inaccessible in-game. Spigot simply does not load data for offline players. I would have to scan every UUID `.dat` file manually.

### Kotlin Coroutines

I tried using the excellent [MCCoroutine](https://github.com/Shynixn/MCCoroutine) library to rewrite the scan logic. MCCoroutine lets you write suspendable commands and event handlers using context that runs on the Minecraft main thread when needed. It is super clean and easy to work with, I use it a lot for many of my plugins.

It looked perfect on paper, but Spigot (no pun intended) still runs any block or inventory access on the main thread, so this doesn't work, unfortunately.

## Processing NBT with Rust

At this point, it made way more sense to write a standalone tool. Something not tied to the Minecraft server limitations at all. No threads being blocked or `Can't keep up! Is the server overloaded? Running 20480ms or 409 ticks behind` messages.

I made a Rust program that reads `.mca` region files and `.dat` player files directly. It uses [`simdnbt`](https://github.com/azalea-rs/simdnbt) for NBT parsing, [`mca`](https://github.com/VilleOlof/mca) for region layout, and [`rayon`](https://github.com/rayon-rs/rayon) for parallelism.

It does not run in the server, it just opens files and edits bytes.

### Scanning regions (in parallel)

Rayon is absolutely the reason this tool finishes in minutes instead of hours (or years, in the case of a Spigot plugin). Minecraft region files are just folders full of `.mca` files, one per 32x32 chunk grid. You do not need to read them sequentially. Nothing depends on order. Perfect setup for data parallelism.

What I did was list the paths for each region folder (Overworld, Nether, End) and call `par_bridge()` on them. That creates a parallel iterator:

```rust title="main.rs"
vec![
  Path::new("world/region"),
  Path::new("world_nether/DIM-1/region"),
  Path::new("world_the_end/DIM1/region"),
].iter().par_bridge().for_each(|path| {
  process_region_folder(path);
});
```

Rayon will dynamically adapt handling each region folder for maximum performance. This runs as fast as the disk and CPU allow and is way faster than anything you can do inside a Minecraft server using the Spigot API.

### Finding items stored in blocks and mobs

In case you don't know, players can store items in not only chests and shulkers, but also donkeys, llamas, and minecarts, as you can put chests in them.

Some dupe exploits specifically use these mob inventories. Players will ride a donkey with a chest, freecam out, open its inventory, and when the mob despawns, you keep both your own items and the mob’s stash. That’s the infamous donkey dupe method.

So we need to be careful to check eeeverywhere you can store items, even mobs. My code doesn't look for mobs, tho. I'm not sure why. I'm trying to figure that out as I write this post after almost 6 months I coded this. lol.

Anyways... Chunks are stored as tags in `.mca` region files (see [Chunk format](https://minecraft.wiki/w/Chunk_format#NBT_structure) on the Minecraft Wiki). So I just need to look for `block_entities` tags. Those are data objects associated with certain blocks. In our case, we want any of those that includes an `Items` list:

```rust title="main.rs"
let maybe_block_entities = nbt
  .list("block_entities")
  .and_then(|list| list.compounds());

if let Some(mut block_entities) = maybe_block_entities {
  let updated_block_entities = block_entities
  .into_iter()
  .map(|block_entity| {
    let maybe_items = block_entity
      .list("Items")
      .and_then(|list| list.compounds());

    if let Some(items) = maybe_items {
      // handle items inside block_entity...
      let updated_items = process_items_list(items);
    }

    // return the block_entity with updated data
    return block_entity.to_owned()
  })
  // ...
}
```

> 💡 This is also a great moment for deleting unused chunks and save up some storage by checking tags like `InhabitedTime` and checking if there aren't any player buildings.

In theory, we would just need to do the same thing and look for entities with a `ChestedHorse` tag (as Minecraft considers any mobs with a chest, a horse) and go through that same `Items` list. As of Minecraft 1.17, entities are stored in their own `.mca` files (see [Entity format](https://minecraft.wiki/w/Entity_format#Directory_structure)), so I guess I just didn't bother.

### Handling player data

Player data is stored in `.dat` files (see [Player format](https://minecraft.wiki/w/Player.dat_format#NBT_structure)). Each one contains a full NBT blob for the player's state. That includes their inventory, ender chest, and more.

So I also scan the player data folders in parallel, just like the map regions:

```rust title="main.rs"
vec![
    Path::new("world/playerdata"),
    Path::new("world_nether/playerdata"),
    Path::new("world_the_end/playerdata"),
].iter().par_bridge().for_each(|path| {
    process_player_data_folder(path);
});
```

Player data files are gzip compressed, except when they aren't. I don't know why that is, but what I do is decompress it, then if it fails, I just parse the raw data:

```rust title="main.rs"
// read raw bytes from the .dat file
let mut player_data = Vec::new();
File::open(&player_data_path).unwrap().read_to_end(&mut player_data).unwrap();

// try to decompress it
let mut decoded_src_decoder = flate2::read::GzDecoder::new(&player_data[..]);
let mut input = Vec::new();

// if decompression fails, just treat it as raw NBT
if Read::read_to_end(&mut decoded_src_decoder, &mut input).is_err() {
  input = player_data.to_vec();
}
```

### Cleaning up the inventory

I extract both the player's `Inventory` and `EnderItems` (items in the player's ender chest). For each of them, I run the same `process_items_list()` method I used when handling world chunks, which will delete or modify certain items.

```rust title="main.rs"
vec!["Inventory", "EnderItems"].iter().for_each(|inventory_name| {
  let maybe_items = base_nbt
    .list(inventory_name)
    .and_then(|list| list.compounds());
  if let Some(items) = maybe_items {
    let updated_items = process_items_list(items);
    // ...
  }
});
```

### Deleting and modifying items

A nice thing about Minecraft NBT is that inventories all use the same structure. Whether it's a player inventory, a chest, or donkey, the items are always stored in a list of compounds with the same keys. That means I can use the same method, `process_items_list()`, to handle all of them.

This method handles the logic behind deciding what stays and what gets nerfed. It takes a list of items from any inventory and returns a new list of cleaned-up items. Here's what we modify:

- <CloseLineSystem class="inline text-red-600 -mx-1 size-7 -translate-y-0.5" /> <strong>Removes</strong> all Totem of Undying
- <CloseLineSystem class="inline text-red-600 -mx-1 size-7 -translate-y-0.5" /> <strong>Removes</strong> all Elytra
- <SubtractLineSystem class="inline text-yellow-600 -mx-1 size-7 -translate-y-0.5" /> <strong>Reduces</strong> all End Crystals (64x → 1x)
- <SubtractLineSystem class="inline text-yellow-600 -mx-1 size-7 -translate-y-0.5" /> <strong>Reduces</strong> all Bottle o' Enchanting (64x → 1x)
- <SubtractLineSystem class="inline text-yellow-600 -mx-1 size-7 -translate-y-0.5" /> <strong>Reduces</strong> all Enchanted Golden Apple (64x → 1x)
- <SubtractLineSystem class="inline text-yellow-600 -mx-1 size-7 -translate-y-0.5" /> <strong>Reduces</strong> all Ender Chests (64x → 1x)
- <SubtractLineSystem class="inline text-yellow-600 -mx-1 size-7 -translate-y-0.5" /> <strong>Reduces</strong> all arrows with potion effects (64x → 1x)
- <HammerLineDesign class="inline text-sky-600 size-5 -translate-y-0.5" /> <strong>Removes</strong> all enchantments from Netherite armor/tools

For removing items, we simply filter them by their ID:

```rust title="main.rs"
items
  .clone()
  .into_iter()
  .filter(|item|
    match item
      .string("id")
      .unwrap()
      .to_string_lossy()
      .to_string()
      .as_str() {
        "minecraft:totem_of_undying" | "minecraft:elytra" => false,
        _ => true,
      }
  )
```

Then we map the filtered items to handle the rest. For reducing the quantity of items, for example, we remove the `count` tag and add it again with a value of `1`:

```rust title="main.rs"
items
  .clone()
  .into_iter()
  .filter(/*...*/)
  .map(|item| {
    let binding = item.clone().string("id").unwrap().to_string_lossy().to_string();
    let id = binding.as_str();

    match id {
      "minecraft:end_crystal" | /*...*/ => {
        let maybe_count = item.int("count");
        if let Some(count) = maybe_count {
          let mut tags = item
            .iter()
            .filter(|tag| tag.0.to_string_lossy() != "count")
            .map(|item| (item.0.to_owned(), item.1.to_owned()))
            .collect::<Vec<(_)>>();
          tags.push(("count".into(), NbtTag::Int(1)));
          return NbtCompound::from_values(tags)
        }
        return item.to_owned()
      }
      // ...
    }
  )
```

As of Minecraft 1.20.5, Mojang moved many item attributes into a structured `components` object under an item compound (see [Data component format](https://minecraft.wiki/w/Data_component_format#enchantments)), and that includes item enchantments.

So properly removing enchantments is bit more tedious, as we need to descend through `item → components → minecraft:enchantments`, and if found, we rebuild the components tag with everything else except the enchantments:

```rust title="main.rs"
match id {
  // ...
 "minecraft:netherite_axe" | /*...*/ => {
    let maybe_enchantments = item
      .compound("item")
      .and_then(|item| item.compound("components"))
      .and_then(|comp| comp.compound("minecraft:enchantments"));

    // if enchantments exist, rebuild the components without them
    if let Some(_enchantments) = maybe_enchantments {
      let mut tags = item
        .compound("item")
        .unwrap()
        .iter()
        .map(|(key, value)| {
          // when we hit the components tag, filter out enchantments
          if key.to_string_lossy() == "components" {
            if let Some(compound) = value.compound() {
              let filtered = compound
                .iter()
                .filter(|(k, _)| k.to_string_lossy() != "minecraft:enchantments")
                .map(|(k, v)| (k.clone(), v.clone()))
                .collect::<Vec<_>>();

              return (
                key.clone(),
                NbtTag::Compound(NbtCompound::from_values(filtered)),
              );
            }
          }
          // otherwise keep the original tag
          (key.clone(), value.clone())
        })
        .collect::<Vec<_>>();

      // re-wrap the item inside an inventory slot, then return it
      let updated_item = NbtCompound::from_values(tags);
      let container_item = vec![
        ("item".into(), NbtTag::Compound(updated_item)),
        ("slot".into(), NbtTag::Int(item.int("slot").unwrap())),
      ];
      return NbtCompound::from_values(container_item);
    }

    // no enchantments found, leave it untouched
    return item.to_owned();
  }
  // ...
}
```

### Saving the files

At this point, we are pretty much done. We just need to save everything after editing:

```rust title="main.rs"
fn process_region_file(region_file_path: PathBuf) {
  // ...process everything and write to buf

  writer.write(&mut buf).expect("Could not write to buffer");
  File::create(region_file_path)
    .unwrap()
    .write_all(&buf)
    .expect("Could not write to file");
}
```

For the player data, we can use `simdnbt` to create a new NBT compound with the modified data for the player. Then, we gzip it again, and save the file:

```rust title="main.rs"
fn process_player_data(player_data_path: PathBuf) {
  // ...process everything and write the new tags

  let updated_nbt = BaseNbt::new(
    "Player",
    NbtCompound::from_values(tags),
  );
  let mut updated_nbt_bytes = Vec::new();
  updated_nbt.write(&mut updated_nbt_bytes);

  let mut buf = vec![];
  let mut encoder = flate2::write::GzEncoder::new(&mut buf, Compression::default());
  encoder.write_all(updated_nbt_bytes.as_slice()).expect("Could not encode file");
  encoder
    .finish()
    .expect("Could not finish compression");

  File::create(player_data_path)
    .unwrap()
    .write_all(&buf)
    .expect("Could not write to file");
}
```

## The results

My first test only took **11 seconds** to scan **761 region files** on my M1 MacBook Pro:

```
// ...
Processing region file "world/region/r.-3.-2.mca"
Processing region file "world/region/r.3.-4.mca"
Processing region file "world/region/r.27210.52635.mca"
Processing region file "world/region/r.1.-10.mca"
Processing region file "world/region/r.7.1.mca"

Elapsed: 11.96s
```

It took around **26 minutes** to read, scan, and rewrite the entire Overworld, Nether, End, and all player data of **~317 GB of game files** on the 4 vCPU Ampere A1 server. That’s it.

Compared to the plugin approach, it was like pressing a magic cleanup button. I'm personally very happy about it.

As for the impact on the server/community, a vocal minority was definetly mad. But most agreed that this was very much needed for new players to join and old players to come back, as farming and PvPing now means something. Duping might still be a thing eventually, but now there is a clean economy to work with.

## Things I could have done better

First things first, this tool works very well for it's purpose, and if it ain't broke, don't fix it. It could absolutely be cleaner tho.

I **hardcoded** it quite a bit. It would be nice to be able to configure the item IDs, rules, etc. as even I had to change those quite a bit as we were deciding what exactly we wanted to remove or just reduce. If it had a config file, other people could also use this tool more easily.

**Error handling** is also very optimistic. I do a lot of `.unwrap()` and `.expect()` calls because I assume everything would either work or not. This could be catastrophic if something unexpected happens while it's running.

Which brings me to the next point, which is **tracking progress**. Right now, if the tool crashes or gets interrupted midway, it will start from zero. A smart thing to do would be to list the `.mca` and `.dat` files it already completed.

And then… there's the **cloning**. This code clones and recreates basically everything. Strings, tags, full compounds... I did that because I got tired of fighting the borrow checker and I just wanted the thing to run. And it does. But if you’re reading this and you know how to refactor this without cloning all the things: congrats, you're better at Rust than I am (please do it).

## All done (and gzipped)

I love writing Rust and I love messing with Minecraft :)

Thanks to the players who asked for this. A huge shoutout to the goat [Minecraft Wiki](https://minecraft.wiki). It's the best source for figuring out how the game files are structured. Without all that documentation, I would literally still be lost trying to guess where the shulker was.

If this tool could be useful for you in some way, or you want to check the full source code, it's [available here](https://github.com/doceazedo/soft-econ-reset/). Maybe leave it a star? ⭐︎~

And make backups.

Really.
