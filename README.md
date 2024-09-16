<img width="200px" src="app/static/img/white_logo.png">

# TuneWave - E-commerce de Fones de Ouvido 🎧

**TuneWave** é uma aplicação web de e-commerce especializada na venda de fones de ouvido de alta qualidade. O sistema permite que os usuários explorem diferentes produtos, visualizem suas informações detalhadas e realizem compras online, enquanto os administradores gerenciem o estoque e os produtos do catálogo.

Este projeto faz parte de um trabalho da disciplina de **Orientação a Objetos**, e a aplicação foi desenvolvida utilizando a **arquitetura MVC (Model-View-Controller)**.

## Visão Geral do Projeto

TuneWave foi desenvolvido com uma separação clara entre as camadas de **Model**, **View** e **Controller**, facilitando a manutenção e a escalabilidade da aplicação. O framework Bottle gerencia as rotas e integrações entre o backend e o frontend, enquanto o JavaScript manipula dinamicamente o conteúdo exibido para o usuário.

### Funcionalidades Principais

1. **Catálogo de Produtos**
   - Visualização de uma lista de fones de ouvido com informações detalhadas, como preço, conectividade e disponibilidade no estoque.
   - As opções de conectividade incluem: `Wireless`, `Wired` e `Hybrid`.
   - As categorias dos produtos incluem: `Headphones`, `Earbuds`, `In-Ear`, `Headsets`, e `Noise-Cancelling`.
     
2. **Carrinho de Compras**
   - Funcionalidade feita para usuários cadastrados e autenticados.
   - Permite adicionar, remover e editar a quantidade dos produtos no carrinho.

3. **Perfil de Usuário**
   - Os usuários podem visualizar seu perfil, editá-lo e deletar sua conta.
   - Também é possível visualizar os pedidos feitos.

4. **Gerenciamento de Produtos**
   - A aplicação permite a adição, edição e deleção de produtos no sistema.
   - Implementado um sistema separado de rotas para o gerenciamento de produtos por meio de uma classe `ProductApplication`, enquanto rotas gerais estão na classe `Application`.
   - O sistema permite o controle de estoque de cada produto.

5. **Simulação de pagamento**
   - Usuários podem efetuar o pagamento dos seus produtos do carrinho e transformá-los em um pedido.

## Tecnologias Utilizadas

### Backend
- **Python** (com o framework **Bottle**)
- **Banco de dados JSON** para armazenar informações de produtos e usuários

### Frontend
- **HTML5**, **CSS3**, **JavaScript**
- **Renderização dinâmica de conteúdo** no frontend com base em dados recebidos via API

### Arquitetura
- **MVC (Model-View-Controller)**: Implementado para manter uma separação clara entre as responsabilidades de manipulação de dados (Model), interface do usuário (View), e lógica de controle de fluxo (Controller).

### Docker
- A aplicação foi **dockerizada** para facilitar o processo de deploy e garantir que o ambiente de desenvolvimento seja consistente com o de produção.

## Estrutura de Dados

### Exemplo
A estrutura de **produtos** no arquivo JSON segue o modelo abaixo:

```json
[
    {
        "id": "123",
        "name": "Headphone Model X",
        "price": 199.99,
        "category": "Over-Ear",
        "connectivity": "Wireless",
        "description": "High-quality over-ear headphones with noise cancellation.",
        "brand": "SoundTech",
        "colorStock": {
            "black": 15,
            "silver": 10
        },
        "imageFileName": "main_image_headphone.png"
    },
    {
        "id": "124",
        "name": "Earbuds Pro",
        "price": 89.99,
        "category": "In-Ear",
        "connectivity": "Wireless",
        "description": "Compact and powerful in-ear earbuds with a comfortable fit.",
        "brand": "SoundTech",
        "colorStock": {
            "white": 20,
            "blue": 12
        },
        "imageFileName": "headphone-home.png"
    }
]
```

## Requisitos para Executar a Aplicação
- Docker
- Python 3.x
- Bottle framework (`pip install bottle`)
