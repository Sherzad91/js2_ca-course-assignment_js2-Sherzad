import { USER } from './constants.js';

export function singlePost(post) {
  return `
      <div data-id='${post.id}' class='flex flex-col bg-white rounded-md shadow'>
         <div class='flex items-center gap-4 border-b p-4'>
         ${
           post.author.avatar
             ? `<img src='${post.author.avatar}' class='w-14 h-14 rounded-full' />`
             : `<div class='w-14  h-14 rounded-full'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
         </svg>
         </div>`
         }
            <span>${post.author.name}</span>
         </div>

         <div class='p-4'>
            <a class='hover:underline' href='/single-post.html?id=${post.id}'>
               <h1 class='text-xl font-semibold mb-1'>${post.title}</h1>
            </a>
            <span class='block mb-3 text-gray-400 text-sm'>${new Date(
              post.created
            ).toLocaleString()}</span>

            ${post.media ? `<img class='w-full rounded-md h-auto mb-2' src='${post.media}' />` : ``}
            <p>
               ${post.body}
            </p>
         </div>

         <div class='p-4 border-t flex justify-between'>
               <div class='flex items-center gap-4'>
                  <span onclick="reactPost(${
                    post.id
                  })" class='px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 active:bg-gray-300 transition cursor-pointer'>
                     ${post.reactions.reduce((accumulator, object) => {
                       return accumulator + object.count;
                     }, 0)} 👍🏼
                  </span>

                  <a href='/single-post.html?id=${
                    post.id
                  }' class='px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 active:bg-gray-300 transition cursor-pointer'>
                     ${post._count.comments} Comments 
                  </a>

                  ${
                    USER.name === post.author.name
                      ? `
                     <span onclick="deletePost(${post.id})" data-id='${
                          post.id
                        }' id='delete-post' class='px-2 py-1 bg-red-100 rounded-md hover:bg-red-200 active:bg-red-300 transition cursor-pointer'>
                        Delete
                     </span>
                  
                     <span onclick="openEditModal('${JSON.stringify(post)
                       .split('"')
                       .join('&quot;')}')" data-id='${
                          post.id
                        }' id='edit-post' class='px-2 py-1 bg-sky-100 rounded-md hover:bg-sky-200 active:bg-sky-300 transition cursor-pointer'>
                        Edit
                     </span>
                  `
                      : ``
                  }
                  
               </div>
         </div>
      </div>
   `;
}

export function myPost(post, me) {
  return `
       <div data-id='${post.id}' class='flex flex-col bg-white rounded-md shadow'>
          <div class='flex items-center gap-4 border-b p-4'>
          <div class='w-14  h-14 rounded-full'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
             <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          </div>
          <span>${me.name}</span>
             
          </div>
 
          <div class='p-4'>
             <a class='hover:underline' href='/single-post.html?id=${post.id}'>
                <h1 class='text-xl font-semibold mb-1'>${post.title}</h1>
             </a>
             <span class='block mb-3 text-gray-400 text-sm'>${new Date(
               post.created
             ).toLocaleString()}</span>
 
             ${
               post.media ? `<img class='w-full rounded-md h-auto mb-2' src='${post.media}' />` : ``
             }
             <p>
                ${post.body}
             </p>
          </div>
 ${
   me.name === USER.name
     ? `
          <div class='p-4 border-t flex justify-between'>
          <div class='flex items-center gap-4'>
                      <span onclick="deletePost(${post.id})" data-id='${
         post.id
       }' id='delete-post' class='px-2 py-1 bg-red-100 rounded-md hover:bg-red-200 active:bg-red-300 transition cursor-pointer'>
                         Delete
                      </span>
                   
                      <span onclick="openEditModal('${JSON.stringify(post)
                        .split('"')
                        .join('&quot;')}')" data-id='${
         post.id
       }' id='edit-post' class='px-2 py-1 bg-sky-100 rounded-md hover:bg-sky-200 active:bg-sky-300 transition cursor-pointer'>
                         Edit
                      </span>
                   
                </div></div>`
     : ``
 }
       </div>
    `;
}

export function singleComment(comment) {
  return `
      <div class='flex flex-col bg-white border-t'>
         <div class='flex items-center gap-4 p-4 !pb-0'>
            <span class='font-semibold'>${comment.owner}</span>
         </div>


         <div class='p-4 !pt-1'>
         <span class='block mb-3 text-gray-400 text-sm'>${new Date(
           comment.created
         ).toLocaleString()}</span>
            <p>
               ${comment.body}
            </p>
         </div>
      </div>
   `;
}

export function singleUser(user) {
  return `
      <div class='flex flex-col bg-white rounded-md shadow'>
         <div class='flex items-center justify-between p-4'>
            <a class='hover:underline' href='/single-user.html?name=${user.name}'>
               ${user.name}
            </a>
            <div>
            ${
              user.isFollowing
                ? `<span onclick="unfollowUser('${user.name}')" class='font-semibold hover:underline cursor-pointer'>Unfollow</span>`
                : `<span onclick="followUser('${user.name}')" class='font-semibold hover:underline cursor-pointer'>Follow</span>`
            }
               
            </div>
         </div>
      </div>
   `;
}
