<script lang="ts">
  import { LANG } from '$lib/stores';

  $: defaultUsage = $LANG.streams.tts.usage.default.split('%s');
  $: googleUsage = $LANG.streams.tts.usage.google.split('%s');
  $: pollyUsage = $LANG.streams.tts.usage.polly.split('%s');
  $: ssmlUsage = $LANG.streams.tts.usage.ssml.split('%s');
</script>

<div class="content">
  <ul>
    <li>
      {defaultUsage[0]}
      <code>!tts &lt;{$LANG.streams.tts.placeholder.message}&gt;</code>
      {defaultUsage[1]}
    </li>
    <li>
      {googleUsage[0]}
      <code>!tts google &lt;{$LANG.streams.tts.placeholder.message}&gt;</code>
      {googleUsage[1]}
    </li>
    <li>
      {pollyUsage[0]}
      <code>
        !tts &lt;{$LANG.streams.tts.placeholder.code}&gt; &lt;{$LANG.streams.tts.placeholder
          .message}&gt;
      </code>
      {pollyUsage[1]}
    </li>
    <li>
      {ssmlUsage[0]}
      <code
        >!tts &lt;{$LANG.streams.tts.placeholder.code}&gt; ssml &lt;{$LANG.streams.tts.placeholder
          .message}&gt;</code
      >
      {ssmlUsage[1]}
      <a
        href="https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html"
        target="_blank"
        rel="noreferrer"
      >
        {$LANG.streams.tts.ssmlTags}
      </a>
      {ssmlUsage[2]}
    </li>
  </ul>
</div>
