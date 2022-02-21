<script lang="ts">
  import { lang } from '$lib/stores';
  import { Portfolio } from '$lib/components';
  import semaninhaImage from '../../../assets/img/portfolio-semaninha.webp';
  import convergenciaImage from '../../../assets/img/portfolio-convergencia.webp';
  import gruposTelegramImage from '../../../assets/img/portfolio-grupostelegram.webp';
  import overlayImage from '../../../assets/img/portfolio-overlay.webp';
  import doceAzedoImage from '../../../assets/img/portfolio-doceazedo.webp';

  const items = [
    {
      image: semaninhaImage,
      url: 'https://semaninha.com'
    },
    {
      image: convergenciaImage,
      scroll: '1.5s',
      url: 'https://convergencia.net.br'
    },
    {
      image: gruposTelegramImage,
      scroll: '4s',
      url: 'https://grupostelegram.com.br'
    },
    {
      image: overlayImage,
      url: 'https://github.com/doceazedo/overlay'
    },
    {
      image: doceAzedoImage,
      url: 'https://doceazedo.com'
    }
  ];
</script>

<Portfolio {items} title={$lang.portfolio.title} />
