const form = document.getElementById('form');
const title = document.querySelector('input.title');
const content = document.querySelector('textarea.content');

let error = document.getElementById('error');


form.addEventListener('submit', function(e){
    e.preventDefault();


    const titleValue= title.value.trim();
    const contentValue = content.value.trim();


    if(titleValue === '' || contentValue === ''){


        error.textContent = 'Title and content are required!';
        return;
    }

    if(titleValue.length <2){

                error.textContent = 'Title must be at least 2 characters long!';
                return;

    }

    if(contentValue.length <10){

                error.textContent = 'Content must be at least 10 characters long!';
                return;

    }



    error.textContent='';
    form.submit();

})

