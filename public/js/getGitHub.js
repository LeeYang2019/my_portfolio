const init = () => {
  getGitRepoInformation('LeeYang2019');
};

//gets githubrepos for a given user
async function getGitHubRepos(username) {
  return await fetch(`/githubRepos/${username}`)
    .then((array) => {
      return array.json();
    })
    .then((repos) => {
      console.log(repos);
      return repos
        .filter((repo) => repo.stargazers_count > 0)
        .map((starRepo) => {
          return starRepo;
        });
    })
    .catch((error) => console.log(error));
}

//gets the imgsrc for a given repo
async function getImgSrcFromReadme(username, repo) {
  return await fetch(`/githubRepos/${username}/${repo}`)
    .then((result) => {
      return result.json();
    })
    .then((readme) => {
      //grab readme content and decode it
      const decodedContent = window.atob(readme.content);
      //parse content by line, filter by image link and remove unneeded end of line characters
      const imgSrc = decodedContent
        .split('\n')
        .filter((line) => line.includes('png'))
        .map((src) => {
          //grab substring from where url begins to end
          return src.substr(src.indexOf('(') + 1).replace(')', '');
        });
      return imgSrc;
    })
    .catch((error) => console.log(error));
}

//constructs a portfolio item for each repo
async function getGitRepoInformation(username) {
  getGitHubRepos(username).then((repos) => {
    repos.map((repo) => {
      return getImgSrcFromReadme(username, repo.name).then((readme) => {
        document.querySelector('.portfolio').innerHTML += `
          <div class="portfolio__item">
              <img src="${readme}" class="portfolio__img">
              <div class="portfolio__item__info">
                <h3>${repo.name}</h3>
                <div class="portfolio_btns">
                    <a href="${repo.homepage}" class="demo_btn btn" target="_blank">View Live</a>
                    <a href="${repo.html_url}" class="btn" target="_blank">View Source</a>
                </div>
              </div>
          </div>
        `;
      });
    });
  });
}

window.onload = init;
