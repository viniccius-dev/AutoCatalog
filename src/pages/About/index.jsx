import { useNavigate } from 'react-router-dom';

import { Container } from "./styles";
import { Header } from '../../components/Header';

export function About() {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <Container>
            <Header />

            <main>
                <section>
                    <header>
                        <h1>Adicionar veículo</h1>
                        <button onClick={handleBack}>Voltar</button>
                    </header>

                    <div>
                        <h3>Problema</h3>
                        <p>No mundo automotivo atual, encontrar informações precisas e confiáveis sobre veículos pode ser uma tarefa árdua e demorada. A falta de fontes centralizadas e atualizadas dificulta a tomada de decisão dos consumidores.</p>

                        <h3>Solução proposta</h3>
                        <p>O AutoCatalog surge como uma resposta a essa lacuna, oferecendo uma fonte de informação rápida, completa e confiável para a avaliação e comparação de automóveis. Nosso objetivo é facilitar o processo de pesquisa e ajudar os consumidores a tomar decisões informadas.</p>

                        <h3>Conclusão</h3>
                        <p>O AutoCatalog representa não apenas uma ferramenta conveniente, mas também um recurso indispensável para entusiastas de automóveis, compradores em potencial e profissionais da indústria. Estamos comprometidos em fornecer a melhor experiência possível aos nossos usuários, ajudando-os a encontrar o veículo perfeito para suas necessidades. Obrigado pela atenção.</p>
                    </div>
                </section>
            </main>
        </Container>
    );
}