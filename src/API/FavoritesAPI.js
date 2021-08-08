async function getFavoritesRepo() {
  const url = "api.github.com/search/repositories?q=stars:%3E1&sort=stars";
  let repoDetail = {};

  console.log("1");

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      repoDetail.id = data.id;
      console.log(data.items);
      return repoDetail;
    });

    return repoDetail;
}

export { getFavoritesRepo };
