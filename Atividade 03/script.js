const btnConsultar = document.querySelector('.btnConsultar');
const cep = document.querySelector('.cep');
const logradouro = document.querySelector('.logradouro');
const bairro = document.querySelector('.bairro');
const cidade = document.querySelector('.cidade');
const uf = document.querySelector('.uf');
const mensagemDeErro = document.querySelector('.mensagemDeErro');

const validarCep = (cep) => cep.length === 8 ? true : false;

btnConsultar.addEventListener ('click', async() => {
    const cepRequisicao = document.querySelector('.cepRequisicao').value;
    if (!validarCep(cepRequisicao)){
        cep.innerHTML = '';
        logradouro.innerHTML = '';
        bairro.innerHTML = '';
        cidade.innerHTML = '';
        uf.innerHTML = '';
        mensagemDeErro.innerHTML = 'CEP deve ter 8 dígitos!';
        return;
    }
    try {
        const url = `https://viacep.com.br/ws/${cepRequisicao}/json/`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.erro){
            throw new Error('CEP não encontrado!');
        }

        console.log(data); //para saber se está pegando o objeto direito
        cep.innerHTML = data.cep;
        logradouro.innerHTML = data.logradouro;
        bairro.innerHTML = data.bairro;
        cidade.innerHTML = data.localidade;
        uf.innerHTML = data.uf;
        mensagemDeErro.innerHTML = '';
    } catch (erro){
        cep.innerHTML = '';
        logradouro.innerHTML = '';
        bairro.innerHTML = '';
        cidade.innrHTML = '';
        uf.innerHTML = '';
        mensagemDeErro.innerHTML = 'CEP inválido ou erro na requisição!';
    }
})