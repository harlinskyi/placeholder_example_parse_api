const template = (id, title, userId, body) => {
    return `
    <div class="d-flex text-muted pt-3">
    <div class="bd-placeholder-img flex-shrink-0 me-2 rounded" style="background-color: #${(Math.random().toString(16)).substring(2, 8)};"></div>
    <p class="pb-3 mb-0 small lh-sm border-bottom">
      <span class="d-block text-gray-dark"><small class="me-2">PostId:&nbsp;${id}</small><small>UserId:&nbsp;${userId}</small></span>
      <strong class="d-block text-gray-dark msgTitle">${title}</strong>
      <span class="msgBody">${body}</span>
    </p>
  </div>
    `
}
const p = new Promise((resolve, reject) => {
    let url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url)
        .then((response) => {
            var contentType = response.headers.get("content-type");
            if (contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError(`Oops, we haven't got JSON from ${url}!`);
        })
        .then((data) => {
            let postBlock = document.getElementById('posts');
            data.forEach(obj => {
                let htmlPost = template(
                    obj.id,
                    obj.title,
                    obj.userId,
                    obj.body
                );
                postBlock.insertAdjacentHTML('beforeEnd', htmlPost);
            });
            document.getElementById('countPosts').innerText = data.length;

        })
        .catch((err) => console.log('Error: ', err));
})