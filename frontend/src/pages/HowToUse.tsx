import { BadgePercent, BrushCleaning, Edit, Filter, Lightbulb, PackagePlus, Percent, ShoppingCart, TicketPercent, Trash, XCircle } from 'lucide-react';
import { Card, Container } from 'react-bootstrap';
import { CircleHalf } from 'react-bootstrap-icons';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useTheme } from '../theme/ThemeContext';

export default function HowToUse() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const cardClass = isDark ? 'bg-dark text-light border-secondary' : 'bg-light text-dark border-secondary';
    const textMutedClass = isDark ? 'text-light' : 'text-muted';

    return (
        <DashboardLayout title='Como Usar'>
            <Container fluid className="px-2 px-md-1">
                {/* Produtos */}
                <Card className={`mb-4 ${cardClass}`}>
                    <Card.Header className={'d-flex align-items-center gap-2 fw-bold border-bottom'}>
                        <ShoppingCart size={20} />
                        Gerenciamento de Produtos
                    </Card.Header>
                    <Card.Body>
                        <div className='mb-3'>
                            <h5 className='fw-semibold d-flex align-items-center gap-2'>
                                <PackagePlus size={20} />
                                Cadastro de Produtos
                            </h5>
                            <p className={`${textMutedClass} text-justify mb-0`}>
                                Utilize o botão "Cadastrar Produto" para cadastrar um novo produto.
                                Você será redirecionado para uma nova página com um formulário onde você deve preencher o nome, a descrição (opcional), o preço e estoque.
                                Após isso clique em salvar.
                            </p>
                        </div>

                        <div className="mb-3">
                            <h5 className='fw-semibold d-flex align-items-center gap-2'>
                                <Edit size={16} />
                                Edição
                            </h5>
                            <p className={`${textMutedClass} text-justify mb-0`}>
                                Clique no botão de lápis para editar um produto. Você será redirecionado para uma nova página com as informações do produto e nela você vai poder editar o produto selecionado.
                            </p>
                        </div>

                        <div className="mb-3">
                            <h5 className='fw-semibold d-flex align-items-center gap-2'>
                                <Trash size={16} />
                                Remoção
                            </h5>
                            <p className={`${textMutedClass} text-justify mb-0`}>
                                Clique no botão da lixeira para remover um produto. Um modal será aberto na tela pedido sua confirmação para poder efetura a remoção do produto.
                            </p>
                        </div>
                    </Card.Body>
                </Card>

                {/* Descontos e Cupons */}
                <Card className={`mb-4 ${cardClass}`}>
                    <Card.Header className={'d-flex align-items-center gap-2 fw-bold border-bottom'}>
                        <BadgePercent size={20} />
                        Aplicação de Descontos
                    </Card.Header>
                    <Card.Body>
                        <div className='mb-3'>
                            <h5 className='fw-semibold d-flex align-items-center gap-2'>
                                <Percent size={20} />
                                Desconto Percentual
                            </h5>
                            <p className={`${textMutedClass} text-justify mb-0`}>
                                Aplique um percentual de desconto diretamente no produto. Ex: 10% de desconto.
                            </p>
                        </div>

                        <div className='mb-3'>
                            <h5 className='fw-semibold d-flex align-items-center gap-2'>
                                <TicketPercent size={20} />
                                Cupom Promocional
                            </h5>
                            <p className={`${textMutedClass} text-justify mb-0`}>
                                Você pode aplicar um cupom previamente cadastrado. O sistema mostra apenas cupons válidos, com informações como:
                            </p>
                            <ul className={`${textMutedClass} text-justify ps-4 mb-0`} style={{ listStyleType: 'disc' }}>
                                <li>Nome: nome do cupom de desconto</li>
                                <li>Valor: percentual ou valor fixo em R$</li>
                                <li>Validade: data de expiração do cupom</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className='fw-semibold d-flex align-items-center gap-2'>
                                <XCircle size={20} />
                                Remoção de Desconto
                            </h5>
                            <p className={`${textMutedClass} text-justify mb-0`}>
                                Clique no botão de remover para excluir o desconto aplicado ao produto.
                                Uma vez feito isso o mesmo desconto não poderá ser aplicado novamente a esse produto
                            </p>
                        </div>
                    </Card.Body>
                </Card>

                {/* Filtros, Paginação e Tema */}
                <Card className={`mb-4 ${cardClass}`}>
                    <Card.Header className={'d-flex align-items-center gap-2 fw-bold border-bottom'}>
                        <Lightbulb size={20} />
                        Dicas de Navegação
                    </Card.Header>
                    <Card.Body>
                        <div className='mb-3'>
                            <h5 className='fw-semibold d-flex align-items-center gap-2'>
                                <Filter size={20} />
                                Filtros e Paginação
                            </h5>
                            <p className={`${textMutedClass} text-justify mb-0`}>
                                Use os filtros para buscar produtos por nome, faixa de preço ou com desconto.
                                Uma vez que você tenha selecionado os filtros é necessário aplicá-los apertando o botão <span className='p-1'><Filter size={18} /></span>.
                                Também é possível remover os filtros aplicados apertando no botão <span className='p-1'><BrushCleaning size={18} /></span>, assim a lista de produtos será exibida no seu estado orignal antes da aplicação dos filtros.                            </p>
                        </div>

                        <div className='mb-3'>
                            <h5 className='fw-semibold d-flex align-items-center gap-2'>
                                <CircleHalf size={20} />
                                Alternância de Tema
                            </h5>
                            <p className={`${textMutedClass} text-justify mb-0`}>
                                Você pode alternar entre o modo claro e escuro usando o botão de tema na barra superior.
                            </p>
                        </div>
                    </Card.Body>
                </Card>

                {/* Dashboard e Relatórios */}
                <Card className={`mb-4 ${cardClass}`}>
                    <Card.Header className={'d-flex align-items-center gap-2 fw-bold border-bottom'}>
                        <Lightbulb size={20} />
                        Dashboard e Relatórios
                    </Card.Header>
                    <Card.Body>
                        <div className='mb-3'>
                            <h5 className='fw-semibold d-flex align-items-center gap-2'>
                                <Percent size={20} />
                                Painel de Indicadores (Dashboard)
                            </h5>
                            <p className={`${textMutedClass} text-justify mb-0`}>
                                Acesse o menu “Dashboard” para visualizar indicadores-chave de desempenho como:
                                total de produtos, esgotados, com descontos, média de preços e gráficos com comparativos de descontos.
                            </p>
                        </div>

                        <div>
                            <h5 className='fw-semibold d-flex align-items-center gap-2'>
                                <BadgePercent size={20} />
                                Relatórios Avançados
                            </h5>
                            <p className={`${textMutedClass} text-justify mb-0`}>
                                A seção de Relatórios fornece análises detalhadas do sistema. Entre os principais insights:
                            </p>
                            <ul className={`${textMutedClass} text-justify ps-4`} style={{ listStyleType: 'disc' }}>
                                <li>Distribuição de estoque por faixa de preço</li>
                                <li>Impacto financeiro dos descontos aplicados</li>
                                <li>Produtos com maior estoque e desconto</li>
                                <li>Produtos com maior redução de preço</li>
                                <li>Efetividade dos cupons</li>
                                <li>Comparativo entre preço original e final</li>
                                <li>Cupons próximos da expiração</li>
                            </ul>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </DashboardLayout>
    );
}