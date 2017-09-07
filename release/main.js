var $article = {
  art: null,
  tech: null,
};
var article_data = {
  art: null,
  tech: null,
};
var $content;
var $title;
function uploadArticle(type) {
  var content = $content.innerHTML;
  var title = $title.value;
  postArticle(type, content, title);
}
function getTime() {
  let date = new Date();
  return date.toLocaleDateString();
}
function postArticle(type, content, title) {
  if(title && content) {
    let time = getTime();
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:7777',
      contentType:"application/x-www-form-urlencoded",
      data: {
        'db': 'article_db',
        'collection': type,
        'title': title,
        'time': time,
        'content': content,
      },
      success: function (res) {
        alert('添加成功！');
        updateList();
      }
    });
  }else {
    alert('填完再说');
  }
}
function deleteArticle(type, id) {
  $.ajax({
    type: 'DELETE',
    url: `http://127.0.0.1:7777?db=article_db&collection=${type}&id=${id}`,
    contentType:"application/x-www-form-urlencoded",
    success: function (res) {
      alert('删除成功！');
      updateList();
    }
  });
}
function getArticles(type) {
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:7777',
    contentType:"application/x-www-form-urlencoded",
    data: {
      db: 'article_db',
      collection: type
    },
    success: function (res) {
      article_data[type] = res['data'];
      if(res['data']['length']){
        res['data'].forEach(item => {
          $article[type].append(`
          <li class="article"><a href="javascript:void(0);">${item.title}</a>&nbsp;
          <button onclick="deleteArticle('${type}', '${item._id.$oid}')">删除</button></li>
          `);
        });
      }
    }
  });
}
function updateList() {
  $('.article').remove();
  $title.value = '';
  $content.innerHTML = '';
  getArticles('art');
  getArticles('tech');
}
window.onload = function() {
  $article.art = $('#art');
  $article.tech = $('#tech');
  $content = $('.w-e-text')[0];
  $title = $('#title')[0];
  updateList();
}