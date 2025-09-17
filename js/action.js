function limpa_formulario_cep(){
    // Limpa valores do formulário de CEP
    document.getElementById('txt_rua').innerHTML = "";
    document.getElementById('txt_bairro').innerHTML = "";
    document.getElementById('txt_cidade').innerHTML = "";
    document.getElementById('txt_estado').innerHTML = "";
}

function meu_callback(conteudo){

    if(!("erro" in conteudo)){
        // Atualiza os campos com os valores do JSON
        document.getElementById('txt_rua').innerHTML = conteudo.logradouro;
        document.getElementById('txt_bairro').innerHTML = conteudo.bairro;
        document.getElementById('txt_cidade').innerHTML = conteudo.localidade;
        document.getElementById('txt_estado').innerHTML = conteudo.estado;
    }else{
        // CEP não encontrado
        limpa_formulario_cep();
        alert("CEP não encontrado!");
    }

}

function pesquisa_cep(){

    let valor = document.getElementById("i_cep").value;  
    let div_resp = document.getElementById("resp"); 
    
    // Ativando a div que vai exibir a resposta da pesquisa do CEP
    div_resp.style.display = "block";

    // Deixa apenas Digitos no valor do CEP
    var cep = valor.replace(/\D/g, '');

    if(cep != ""){

        //Expressão regular para validar o CEP
        var validacep = /^[0-9]{8}$/;

        // Validando o CEP
        if(validacep.test(cep)){

            // Preenche temporariamente os campos com ... enquanto consulta a API
            document.getElementById('txt_rua').innerHTML = "...";
            document.getElementById('txt_bairro').innerHTML = "...";
            document.getElementById('txt_cidade').innerHTML = "...";
            document.getElementById('txt_estado').innerHTML = "...";

            // Cria uma tag script no HTML
            var script = document.createElement('script');

            // Faz uma requisição ao servidor do via CEP e ao receber um arquivo JSOM
            // ele é enviado para a função meu_callback
            script.src = 'https://viacep.com.br/ws/'+cep+'/json/?callback=meu_callback';

            // Insere um script no documento HTML
            document.body.appendChild(script);
        }else{
            limpa_formulario_cep();
            alert("Formato de CEP inválido!");
        }

    }else{
        limpa_formulario_cep();
    }

}