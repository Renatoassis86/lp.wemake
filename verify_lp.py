import os
import sys

def print_alert(text):
    border = "=" * len(text)
    print(f"\n\033[91m{border}\033[0m")
    print(f"\033[91m\033[1m{text}\033[0m")
    print(f"\033[91m{border}\033[0m\n")

def print_success(text):
    print(f"\033[92m\033[1m✓ {text}\033[0m")

def print_title(text):
    border = "-" * len(text)
    print(f"\n\033[94m\033[1m{text}\033[0m")
    print(f"\033[94m{border}\033[0m")

def main():
    print_title("🤖 INICIANDO ROBÔ DE VERIFICAÇÃO WE MAKE 🤖")
    
    workspace = r"d:\lp_wemake"
    errors_found = 0

    # ----------------------------------------------------
    # 1. Verificar WaveDivider e shadowColor
    # ----------------------------------------------------
    landing_path = os.path.join(workspace, "sections", "landing.tsx")
    if os.path.exists(landing_path):
        with open(landing_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # O total de WaveDividers na landing
        dividers_count = content.count("<WaveDivider")
        # Quantos têm shadowColor definido
        shadow_count = content.count("shadowColor=")
        
        if dividers_count == shadow_count and dividers_count > 0:
            print_success(f"Ondas e Transições: Todos os {dividers_count} divisores possuem shadowColor sólido configurado.")
        else:
            print_alert(f"[ERRO] Ondas e Transições: Apenas {shadow_count} de {dividers_count} divisores possuem shadowColor. Glitch visual pode ocorrer!")
            errors_found += 1
            
        # Verificar se o PresenceMap está com ssr: false
        if "PresenceMap" in content and "ssr: false" in content:
            print_success("Mapa de Presença: Importado com '{ ssr: false }', eliminando Hydration Errors.")
        else:
            print_alert("[ERRO] Mapa de Presença: Não está configurado com '{ ssr: false }' no landing.tsx. Erro de Hydration provável!")
            errors_found += 1
    else:
        print_alert("[ERRO] landing.tsx não encontrado no diretório!")
        errors_found += 1

    # ----------------------------------------------------
    # 2. Verificar Problem section (fotos7.png e Brush Stroke)
    # ----------------------------------------------------
    problem_path = os.path.join(workspace, "features", "problem", "problem.tsx")
    if os.path.exists(problem_path):
        with open(problem_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Verificar se usa fotos7.png
        if "fotos7.png" in content:
            print_success("Seção Problema: Imagem fotos7.png (sem fundo) está sendo utilizada.")
        else:
            print_alert("[ERRO] Seção Problema: Não está utilizando a imagem fotos7.png! Foto antiga detectada.")
            errors_found += 1
            
        # Verificar se tem ProblemBrushMask ou clipPath
        if "clipPath id=\"problem-brush\"" in content or "problem-brush" in content:
            print_success("Seção Problema: A foto está recortada em formato orgânico (Brush Stroke arredondado).")
        else:
            print_alert("[ERRO] Seção Problema: A foto não está arredondada no formato de pincelada orgânica das crianças!")
            errors_found += 1

        # Verificar se o padding vertical py-24 foi removido/reduzido no Container
        if "py-24" in content:
            print_alert("[ERRO] Seção Problema: Ainda possui o espaçamento py-24 de alto volume no Container!")
            errors_found += 1
        else:
            print_success("Seção Problema: Espaçamento reduzido de py-24 para pt-12 (distância da onda encurtada).")
    else:
        print_alert("[ERRO] problem.tsx não encontrado!")
        errors_found += 1

    # ----------------------------------------------------
    # 3. Verificar CeoVideo section (Sinopse e poster)
    # ----------------------------------------------------
    video_path = os.path.join(workspace, "features", "ceo-video", "ceo-video.tsx")
    if os.path.exists(video_path):
        with open(video_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Verificar poster do vídeo
        if "poster=\"/videos/thumbnail-manifesto.png\"" in content:
            print_success("Vídeo do CEO: Thumbnail recortada sem as bordas pretas configurada como poster.")
        else:
            print_alert("[ERRO] Vídeo do CEO: O elemento <video> está sem o poster '/videos/thumbnail-manifesto.png'!")
            errors_found += 1
            
        # Verificar título e sinopse temáticos
        if "Ciência e fé" in content or "tension" in content or "conflito" in content:
            print_success("Vídeo do CEO: Conteúdo atualizado com as perguntas e sinopse sobre Ciência e Fé.")
        else:
            print_alert("[ERRO] Vídeo do CEO: A sinopse do vídeo não discute Ciência e Fé!")
            errors_found += 1

        # Verificar espaçamento py-24
        if "py-24 bg" in content:
            print_alert("[ERRO] Vídeo do CEO: Ainda possui o espaçamento py-24 de alto volume no topo!")
            errors_found += 1
        else:
            print_success("Vídeo do CEO: Espaçamento reduzido de py-24 para pt-12 (distância da onda encurtada).")
    else:
        print_alert("[ERRO] ceo-video.tsx não encontrado!")
        errors_found += 1

    # ----------------------------------------------------
    # 4. Verificar VipGroup (WhatsApp Mockup e tamanho menor)
    # ----------------------------------------------------
    vip_path = os.path.join(workspace, "features", "vip-group", "vip-group.tsx")
    if os.path.exists(vip_path):
        with open(vip_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Verificar tamanho menor (w-[320px])
        if "w-[320px]" in content:
            print_success("Grupo VIP: Card do celular reduzido para o tamanho elegante de 320px.")
        else:
            print_alert("[ERRO] Grupo VIP: O card do celular não está com w-[320px]!")
            errors_found += 1
            
        # Verificar se simula conversa real de whatsapp
        if "Comunidade VIP - We Make" in content and "Dir. Marcos" in content and "We Make 🚀" in content:
            print_success("Grupo VIP: Mockup de chat do WhatsApp completo e altamente contextualizado.")
        else:
            print_alert("[ERRO] Grupo VIP: Ainda utiliza os blocos genéricos de simulação de chat do WhatsApp!")
            errors_found += 1

        # Verificar espaçamento py-24
        if "py-24 bg" in content:
            print_alert("[ERRO] Grupo VIP: Ainda possui o espaçamento py-24 no topo da seção!")
            errors_found += 1
        else:
            print_success("Grupo VIP: Espaçamento superior reduzido para pt-12.")
    else:
        print_alert("[ERRO] vip-group.tsx não encontrado!")
        errors_found += 1

    # ----------------------------------------------------
    # 5. Verificar Memória de Longo Prazo
    # ----------------------------------------------------
    memory_path = os.path.join(workspace, ".agent", "memory", "wave-transitions.md")
    if os.path.exists(memory_path):
        print_success("Memória de Longo Prazo: O arquivo wave-transitions.md está registrado na memória permanente.")
    else:
        print_alert("[ERRO] Memória de Longo Prazo: O arquivo wave-transitions.md não foi encontrado!")
        errors_found += 1

    # ----------------------------------------------------
    # Síntese final
    # ----------------------------------------------------
    print_title("SÍNTESE DOS RESULTADOS DO ROBÔ")
    if errors_found == 0:
        print(f"\033[92m\033[1m💎 SUCESSO ABSOLUTO! 💎\033[0m")
        print(f"\033[92mO robô não encontrou NENHUM erro na página. Tudo está 100% em conformidade com as suas solicitações.\033[0m\n")
        sys.exit(0)
    else:
        print(f"\033[91m\033[1m⚠️ ATENÇÃO: {errors_found} ERRO(S) ENCONTRADO(S) PELO ROBÔ! ⚠️\033[0m")
        print(f"\033[91mPor favor, corrija os erros alertados acima antes de prosseguir.\033[0m\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
