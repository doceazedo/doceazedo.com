<script lang="ts">
  import _ from '$lib/lang';

  $: defaultUsage = $_.streams.tts.usage.default.split('%s');
  $: googleUsage = $_.streams.tts.usage.google.split('%s');
  $: pollyUsage = $_.streams.tts.usage.polly.split('%s');
  $: ssmlUsage = $_.streams.tts.usage.ssml.split('%s');
</script>

<div class="content">
  <ul>
    <li>
      {defaultUsage[0]}
      <code>!tts &lt;{$_.streams.tts.placeholder.message}&gt;</code>
      {defaultUsage[1]}
    </li>
    <li>
      {googleUsage[0]}
      <code>!tts google &lt;{$_.streams.tts.placeholder.message}&gt;</code>
      {googleUsage[1]}
    </li>
    <li>
      {pollyUsage[0]}
      <code>
        !tts &lt;{$_.streams.tts.placeholder.code}&gt; &lt;{$_.streams.tts.placeholder.message}&gt;
      </code>
      {pollyUsage[1]}
    </li>
    <li>
      {ssmlUsage[0]}
      <code
        >!tts &lt;{$_.streams.tts.placeholder.code}&gt; ssml &lt;{$_.streams.tts.placeholder
          .message}&gt;</code
      >
      {ssmlUsage[1]}
      <a
        href="https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html"
        target="_blank"
        rel="noreferrer"
      >
        {$_.streams.tts.ssmlTags}
      </a>
      {ssmlUsage[2]}
    </li>
  </ul>
</div>
