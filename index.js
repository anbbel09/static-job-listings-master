// let searchContainer = document.getElementById('searchContainer');
// const tagsCont = document.getElementById('tagsCont')

// fetch('data.json')
// .then(res => res.json())
// .then(data => {
//     let jobs = data;

//     for (const job of jobs) {

//         const tags = [job.role, job.level, ...job.languages, ...job.tools];

//         searchContainer.innerHTML += `
//           <article data-id="${job.id}" class="rounded-lg py-1 px-4 relative bg-white w-full h-auto mb-15 shadow-lg job cursor-pointer">
//             <img class="w-1/6 -top-[28px] absolute" src="${job.logo}" alt="${job.company} logo">
//             <div class="mt-8 flex flex-col justify-between gap-2 h-auto">
      
//               <div class="">
//                 <b class="flex gap-3 text-xs items-center">
//                   <h3 class="text-[#5ba4a4] font-bold">${job.company}</h3>
//                   ${job.new ? `<h3 class="bg-[#5ba4a4] p-1 px-2 rounded-full text-white">NEW!</h3>` : ''}
//                   ${job.featured ? `<h3 class="bg-[#2c3a3a] p-1 px-2 text-white rounded-full">FEATURED</h3>` : ''}
//                 </b>
//               </div>
      
//               <h3 class="font-semibold">${job.position}</h3>
      
//               <ul class="flex gap-10 text-sm text-gray-500 cursor-pointer">
//                 <li>${job.postedAt}</li>
//                 <li class="list-disc list-outside">${job.contract}</li>
//                 <li class="list-disc list-outside">${job.location}</li>
//               </ul>
      
//               <hr class="my-3 h-1">
      
//               <div class="w-full h-auto flex gap-4 flex-wrap mb-3">
//               ${tags.map(tag => `
//                 <span class="rounded-md p-2 bg-[#effafa] font-semibold text-[#5ba4a4] cursor-pointer tag">
//                   ${tag}
//                 </span>
//               `).join('')}    
//               </div>
//             </div>
//           </article>
//         `;

        
//     } 
    
//     let job = searchContainer.querySelectorAll('.job');

//     job.forEach(element => {
//         element.addEventListener('click', () => {
//             job.forEach(el => {
//                 el.classList.remove('border-l-4', 'border-[#5ba4a4]');
//             });

//             element.classList.add('border-l-4', 'border-[#5ba4a4]');
//         });
//     });
    
    
    
//     let tags = document.querySelectorAll('.tag');

//     tags.forEach(tag => {
//         tag.addEventListener('click', (e) => {
//             const text = e.target.textContent.trim();
//             const text1 = e.target.outerHTML;
        
           
//             const existe = [...tagsCont.children].some(child => child.textContent.trim() === text);
//             if (existe) return;
        
          
//             tagsCont.innerHTML += `<div class="flex h-auto"> ${e.target.outerHTML}
//                  <img class="w-10 p-2 rounded-r-lg  bg-[#5ba4a4] cross" src="images/icons8-multiplicar-60.png">
//                 </div>`
//             tagsCont.style.display = 'block';
    
        
//             document.querySelectorAll('.job').forEach(job => {
             
//                 const jobTags = [...job.querySelectorAll('.tag')].map(t => t.textContent.trim());
                
            
//                 if (jobTags.includes(text)) {
//                     job.style.display = 'block';
//                 } else {
//                     job.style.display = 'none';
//                 }
//             });

//             tagsCont.addEventListener('click', (e) => {
//                 let element = e.target;
            
//                 if (element.classList.contains('cross')) {
//                     // Eliminar la etiqueta (el padre de la cruz)
//                     element.parentNode.remove();
            
//                     // Verificar si ya no quedan etiquetas dentro del contenedor
//                     if (tagsCont.children.length === 0) {
//                         tagsCont.style.display = 'none';
//                     }
//                 }
//             });
            
            
//         });
//     });
    
    

// })
// .catch(console.error)

//codigo refactorizado //

let searchContainer = document.getElementById('searchContainer');
const tagsCont = document.getElementById('tagsCont');

// Función para filtrar los jobs según los tags seleccionados
function filtrarJobs() {
    const selectedTags = [...tagsCont.querySelectorAll('.tag')].map(tag => tag.textContent.trim());
    const allJobs = document.querySelectorAll('.job');

    allJobs.forEach(job => {
        const jobTags = [...job.querySelectorAll('.tag')].map(t => t.textContent.trim());
        const match = selectedTags.every(tag => jobTags.includes(tag));
        job.style.display = selectedTags.length === 0 || match ? 'block' : 'none';
    });

    // Mostrar u ocultar contenedor según haya tags
    tagsCont.style.display = selectedTags.length === 0 ? 'none' : 'flex';
    tagsCont.classList.add('flex-wrap');
}

fetch('data.json')
.then(res => res.json())
.then(data => {
    let jobs = data;

    for (const job of jobs) {
        const tags = [job.role, job.level, ...job.languages, ...job.tools];

        searchContainer.innerHTML += `
          <article data-id="${job.id}" class="rounded-lg py-1 px-4 relative bg-white w-full h-auto mb-15 shadow-lg job cursor-pointer md:py-5 md:w-5/6 m-auto lg:w-2/5">
            <img class="w-1/6 -top-[28px] absolute md:max-w-20 md:-top-[40px]" src="${job.logo}" alt="${job.company} logo">
            <div class="mt-8 flex flex-col justify-between gap-2 h-auto">
      
              <div class="">
                <b class="flex gap-3 text-xs items-center md:text-lg">
                  <h3 class="text-[#5ba4a4] font-bold ">${job.company}</h3>
                  ${job.new ? `<h3 class="bg-[#5ba4a4] p-1 px-2 rounded-full text-white">NEW!</h3>` : ''}
                  ${job.featured ? `<h3 class="bg-[#2c3a3a] p-1 px-2 text-white rounded-full">FEATURED</h3>` : ''}
                </b>
              </div>
      
              <h3 class="font-semibold md:text-lg">${job.position}</h3>
      
              <ul class="flex gap-10 text-sm text-gray-500 cursor-pointer md:text-md">
                <li>${job.postedAt}</li>
                <li class="list-disc list-outside">${job.contract}</li>
                <li class="list-disc list-outside">${job.location}</li>
              </ul>
      
              <hr class="my-3 h-1">
      
              <div class="w-full h-auto flex gap-4 flex-wrap mb-3 md:text-lg">
              ${tags.map(tag => `
                <span class="rounded-md p-2 bg-[#effafa] font-semibold text-[#5ba4a4] cursor-pointer tag text-sm">
                  ${tag}
                </span>
              `).join('')}    
              </div>
            </div>
          </article>
        `;
    } 
    
    let job = searchContainer.querySelectorAll('.job');

    job.forEach(element => {
        element.addEventListener('click', () => {
            job.forEach(el => {
                el.classList.remove('border-l-4', 'border-[#5ba4a4]');
            });

            element.classList.add('border-l-4', 'border-[#5ba4a4]');
        });
    });
    
    let tags = document.querySelectorAll('.tag');

    tags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            const text = e.target.textContent.trim();
            const tagHTML = e.target.outerHTML;
        
            const existe = [...tagsCont.children].some(child => child.textContent.trim() === text);
            if (existe) return;
        
            tagsCont.innerHTML += `
                 <div class="flex h-auto m-1 w-auto"> ${tagHTML}
                 <img class="w-10 p-2 rounded-r-lg  bg-[#5ba4a4] cross cursor-pointer" src="images/icons8-multiplicar-60.png">
                </div>
            `;

            filtrarJobs(); // Aplicar filtros después de agregar tag
        });
    });

    // Eliminar etiquetas del contenedor y volver a mostrar jobs
    tagsCont.addEventListener('click', (e) => {
        let element = e.target;
    
        if (element.classList.contains('cross')) {
            element.parentNode.remove();
            filtrarJobs(); // Aplicar filtros después de eliminar tag
        }
    });

})
.catch(console.error);
