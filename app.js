const resultsEl = document.getElementById("results");
const viewerEl = document.getElementById("viewer");
const storiesEl = document.getElementById("stories");
const postsEl = document.getElementById("posts");
const profileHeaderEl = document.getElementById("profileHeader");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function createDownloadButton(url, filename) {
  const btn = document.createElement("a");
  btn.href = url;
  btn.className = "download-btn";
  btn.download = filename;
  btn.textContent = "Download";
  btn.target = "_blank";
  btn.rel = "noopener noreferrer";
  return btn;
}

function showProfiles(profiles) {
  resultsEl.innerHTML = "";

  if (!profiles.length) {
    resultsEl.innerHTML = `<div class="profile-card"><p>No public profile found in demo data.</p></div>`;
    return;
  }

  profiles.forEach((profile) => {
    const card = document.createElement("article");
    card.className = "profile-card";
    card.innerHTML = `
      <h3>@${profile.username}</h3>
      <p>${profile.fullName}</p>
      <p>${profile.followers} followers</p>
      <p>${profile.bio}</p>
    `;
    card.addEventListener("click", () => openProfile(profile));
    resultsEl.appendChild(card);
  });
}

function openProfile(profile) {
  viewerEl.classList.remove("hidden");

  profileHeaderEl.innerHTML = `
    <h3>@${profile.username}</h3>
    <p>${profile.fullName} • ${profile.followers} followers</p>
    <p class="meta">${profile.bio}</p>
  `;

  storiesEl.innerHTML = "";
  profile.stories.forEach((story, index) => {
    const storyCard = document.createElement("article");
    storyCard.className = "story-card";
    storyCard.innerHTML = `
      <img src="${story.image}" alt="${story.title}" loading="lazy" />
      <div class="meta">${story.title}</div>
    `;
    storyCard.appendChild(
      createDownloadButton(story.image, `${profile.username}-story-${index + 1}.jpg`)
    );
    storiesEl.appendChild(storyCard);
  });

  postsEl.innerHTML = "";
  profile.posts.forEach((post, index) => {
    const postCard = document.createElement("article");
    postCard.className = "post-card";
    postCard.innerHTML = `
      <img src="${post.image}" alt="${post.caption}" loading="lazy" />
      <strong>${post.caption}</strong>
      <div class="meta">❤️ ${post.likes.toLocaleString()} likes</div>
    `;
    postCard.appendChild(
      createDownloadButton(post.image, `${profile.username}-post-${index + 1}.jpg`)
    );
    postsEl.appendChild(postCard);
  });
}

function doSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    showProfiles(window.DEMO_PROFILES);
    viewerEl.classList.add("hidden");
    return;
  }

  const filtered = window.DEMO_PROFILES.filter(
    (profile) =>
      profile.username.toLowerCase().includes(query) ||
      profile.fullName.toLowerCase().includes(query)
  );

  showProfiles(filtered);
  viewerEl.classList.add("hidden");
}

searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") doSearch();
});

showProfiles(window.DEMO_PROFILES);
