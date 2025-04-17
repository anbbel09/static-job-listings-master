let searchContainer = document.getElementById('searchContainer');
const tagsCont = document.getElementById('tagsCont')

fetch('data.json')
.then(res => res.json())
.then(data => {
    let jobs = data;

    for (const job of jobs) {

        const tags = [job.role, job.level, ...job.languages, ...job.tools];

        searchContainer.innerHTML += `
          <article data-id="${job.id}" class="rounded-lg py-1 px-4 relative bg-white w-full h-auto mb-15 shadow-lg job cursor-pointer">
            <img class="w-1/6 -top-[28px] absolute" src="${job.logo}" alt="${job.company} logo">
            <div class="mt-8 flex flex-col justify-between gap-2 h-auto">
      
              <div class="">
                <b class="flex gap-3 text-xs items-center">
                  <h3 class="text-[#5ba4a4] font-bold">${job.company}</h3>
                  ${job.new ? `<h3 class="bg-[#5ba4a4] p-1 px-2 rounded-full text-white">NEW!</h3>` : ''}
                  ${job.featured ? `<h3 class="bg-[#2c3a3a] p-1 px-2 text-white rounded-full">FEATURED</h3>` : ''}
                </b>
              </div>
      
              <h3 class="font-semibold">${job.position}</h3>
      
              <ul class="flex gap-10 text-sm text-gray-500 cursor-pointer">
                <li>${job.postedAt}</li>
                <li class="list-disc list-outside">${job.contract}</li>
                <li class="list-disc list-outside">${job.location}</li>
              </ul>
      
              <hr class="my-3 h-1">
      
              <div class="w-full h-auto flex gap-4 flex-wrap mb-3">
              ${tags.map(tag => `
                <span class="rounded-md p-2 bg-[#effafa] font-semibold text-[#5ba4a4] cursor-pointer tag">
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
        
           
            const existe = [...tagsCont.children].some(child => child.textContent.trim() === text);
            if (existe) return;
        
          
            tagsCont.innerHTML += e.target.outerHTML;
            tagsCont.style.display = 'block';
    
        
            document.querySelectorAll('.job').forEach(job => {
             
                const jobTags = [...job.querySelectorAll('.tag')].map(t => t.textContent.trim());
                
                console.log(jobTags);
                
            
                if (jobTags.includes(text)) {
                    job.style.display = 'block';
                } else {
                    job.style.display = 'none';
                }
            });
        });
    });
    
    

})
.catch(console.error)

