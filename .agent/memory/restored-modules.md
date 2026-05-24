---
type: project
created: 2026-05-24
updated: 2026-05-24
---

# Diretrizes de Conformidade dos Módulos We Make

Diretrizes permanentes e formatos de código validados para manter a fidelidade visual e evitar regressões na Landing Page.

## 📌 1. Módulo Propósito / Problema (`problem.tsx`)
- **Regra do Clip-Path:** O SVG que define `<clipPath id="problem-brush">` **deve estar posicionado na raiz da seção**, imediatamente dentro do componente `<Section>`. Ele NUNCA deve ser aninhado dentro de componentes de animação tardia (como `<Reveal>` ou `<motion.div>` com delay).
- **Mosaico:** A imagem sem fundo `fotos7.png` deve ser recortada pelo `problem-brush` e acompanhada por dois ícones lúdicos flutuantes com animações de subida e descida (`Zap` à direita-topo, `Gamepad2` à esquerda-inferior).
- **Espaçamento:** Padding vertical ajustado e compacto: `pt-12 pb-24 sm:pt-16 sm:pb-32`.

## 🎥 2. Módulo Vídeo do CEO - "Ciência e Fé" (`ceo-video.tsx`)
- **Foco Teológico:** Discute exclusivamente o Manifesto teológico sob o tema "Ciência e Fé", apresentando as duas perguntas centrais de reflexão na sinopse.
- **Thumbnail:** Usa o poster limpo `/videos/thumbnail-manifesto.png` sem bordas de janelas ou rabiscos externos.

## ✍️ 3. Módulo Depoimentos Confessionais (`testimonials.tsx` - SUBSTITUI O MAPA)
- **Substituição:** Substitui integralmente o mapa territorial.
- **Depoimentos:** Possui **5 depoimentos confessionais de alta fidelidade** representando a diversidade da comunidade (Coordenadora Pedagógica, Diretor Geral, Professor de Robótica, Mãe Confessional e Inovação Docente).
- **Segurança de Tipos:** Devido à verificação estática rigorosa do TypeScript, o acesso a arrays deve ser sempre assegurado por fallback e asserção explícita de tipo para evitar erros de hidratação:
  ```typescript
  const current = (testimonials[activeIndex] || testimonials[0]) as Testimonial;
  ```

## 📱 4. Módulo Grupo VIP (`vip-group.tsx`)
- **Formato:** Smartphone ultra-realista em dark mode com largura restrita a `w-[320px]`.
- **Conteúdo:** Conversa fluida de WhatsApp contextualizada sobre o ecossistema We Make.
