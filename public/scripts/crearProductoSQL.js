window.addEventListener('load', function(){
    let formularioCarga = document.querySelector('form');
    let campoName = document.querySelector ("#name");
    let formatosValidos = /(\.jpg|\.jpeg|\.png|\.gif|\.tiff)$/i;
    let campoMarca = document.querySelector ("#marca");
    let campoPrecio =  document.querySelector ("#precio")
    let campoCategoria = document.querySelector ("#categoria");
    let campoTalle = document.querySelector ("#talle");
    let campoFoto = document.querySelector ("#imagen");
    let ulErrores = document.querySelector('div.errores ul');
    
    formularioCarga.addEventListener('submit',(e)=>{
        let errores = [];

        while( ulErrores.hasChildNodes() ){
            ulErrores.removeChild(ulErrores.lastChild);
        }

        if (campoName.value == ""){
            errores.push ("Por favor colocar un nombre")
        }
        else if (campoName.value.length < 2){
            errores.push  ("El nombre debe tener más de una sola letra")
        }
        if (campoMarca.value == ""){
            errores.push ("Por favor seleccione una marca")
        }
        /*else if (campoDescripcion.value.length < 20){
            errores.push  ("La descripcion debe contener al menos 20 caracteres")        
        }*/
        if (campoPrecio.value == ""){
            errores.push ("Por favor tiene que tener un precio")
        }
        if (campoCategoria.value == ""){
            errores.push ("Por favor seleccione una categoria")
        }
        if (campoTalle.value == ""){
            errores.push ("Por favor seleccione un talle")
        }
        if (campoFoto.value==""){
            errores.push ("Por favor subir una foto")
        }
        else if (!campoFoto.value.match (formatosValidos)){
            errores.push ("Por favor subir una foto con formato válido")
        }
        console.log(errores)
        if(errores.length > 0){
            e.preventDefault();

            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += '<li class=error>' + errores[i] + '</li>'
            }
        } else{
            formulario.submit();
        }


    })})