const form = document.querySelector('.formAdd')
form.addEventListener('submit', function (ev) {
    ev.preventDefault() //não atualiza a pagina

    let pessoa = receberValoresDaTabela(form) //dados vindo do formulario

    let imagemCodificada = converterParaBase64(pessoa.Imagem)

    localStorage.setItem('imagem', imagemCodificada) //add imagem no localstorage
    

    let row

    switch (pessoa.time) {
        case 'fullStack':
            row = document.querySelector('.fullStack')
            pessoa.corFundo = '#5cb85c'
            break
        case 'frontEnd':
            row = document.querySelector('.frontEnd')
            pessoa.corFundo = '#0275d8'
            break
        case 'backEnd':
            row = document.querySelector('.backEnd')
            pessoa.corFundo = '#f0ad4e'
            break
        case 'dataScience':
            row = document.querySelector('.dataScience')
            pessoa.corFundo = '#d9534f'
            break
        case 'mobile':
            row = document.querySelector('.mobile')
            pessoa.corFundo = '#333'
            break
        case 'uxDesign':
            row = document.querySelector('.uxDesign')
            pessoa.corFundo = '#5bc0de'
            break
    }

    row.appendChild(montarCard(pessoa))  //add o card na linha
})

const receberValoresDaTabela = (form) => {
    let pessoa = {
        nome: form.nome.value,
        cargo: form.cargo.value,
        Imagem: form.imagem.files[0],
        time: form.time.value
    }
    return pessoa
}

function adicionardescricao(pessoa) {
    let nomeDescricao = document.createElement('h4') //criando um titulo h4 para o nome da pessoa
    nomeDescricao.textContent = pessoa.nome // adicionando o nome da pessoa na tag h4
    nomeDescricao.style.color = pessoa.corFundo

    let cargoDescricao = document.createElement('p') //criando um paragrafo p
    cargoDescricao.textContent = pessoa.cargo  //add o cargo da pessoa ao paragrafo p

    let figcaption = document.createElement('figcaption')  //criando um figcaption
    figcaption.classList.add('.text-center')  //add uma classe e html ao figcaption
    figcaption.appendChild(nomeDescricao)  //add o nome dentro do figcaption
    figcaption.appendChild(cargoDescricao) //add o cargo dentro do figcaption

    return figcaption
}

function montarCard(pessoa) {

    let foto = document.createElement('img')

    let figure = document.createElement('figure') //criando uma figure
    figure.classList.add('card')
    figure.classList.add('ms-3')
    figure.classList.add('col-md-3')
    figure.style.backgroundImage = 'linear-gradient(to top, white 60%, '+ pessoa.corFundo +' 40%)'
    figure.appendChild(adicionardescricao(pessoa)) // add figcaption 'descricao' ao figure

    return figure
}
// convertendo imagem
function converterParaBase64(imagem){
    return new Promise(resolve => {
        let reader = new FileReader()
        reader.readAsDataURL(imagem)
        reader.onload = function() {
            let imagemCodificada = reader.result.split(',')[1]
            resolve(imagemCodificada)
        }
    })
}