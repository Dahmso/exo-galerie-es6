function init() {
    console.log('init...');
    let app = new App('data.json', document.querySelector('#container'));
}

class photo {
    constructor(titre, url, description) {
        this.titre = titre;
        this.url = url;
        this.description = description;
    }
}
class App {
    constructor(dataPath, htmlref) {
        // console.log(htmlref);
        this.htmlref = htmlref;
        this.loadingData = new Loader();
        this.loadingData.load(dataPath, this.loadData.bind(this));
    }
    loadData(item) {
        this.item = item;
        // console.log(this.htmlref);
        let divGallery = document.createElement("div");
        divGallery.id = "gallery";
        this.htmlref.appendChild(divGallery);
        this.ViewManager = new ViewManager(divGallery);
        this.ViewManager.items = this.item;

    }

}


class Loader {
    constructor() {
        // console.log('constructor', this);
        this.data = [];
    }
    load(dataPath, callBackFunction) {
        this.callBackFunction = callBackFunction;
        let req = new XMLHttpRequest();
        req.onload = this.loadingComplete.bind(this);
        req.open('GET', dataPath, true);
        req.send();
    }

    loadingComplete(event) {
        let data = event.target.responseText;
        this.data = JSON.parse(data)['photos'].map(photos => new photo(photos.titre, photos.url, photos.description));
        this.title = JSON.parse(data)['titre'];
        let title = new ViewManager();
        title.displayTitle(this.title);
        this.callBackFunction(this.data);
    }
}

class ViewManager {
    set items(item) {
        this.item = item;
        this.render();
    }

    constructor( htmlref ){
        this.container = htmlref;
        console.log(this.container);
    }
    render() {
        let itemRenderers = this.item.map((p)=> this.displayPhotos(p));
        itemRenderers.forEach((r)=> document.querySelector("#gallery").appendChild(r));
    }
    displayTitle(title) {
     
        let divTitle = document.createElement("div");
        divTitle.id = "title";
        let displayTitle = document.createElement("h1");
        displayTitle.innerHTML = title;
        document.querySelector("header").appendChild(divTitle);
        divTitle.appendChild(displayTitle);
        


    }

    displayPhotos(photos) {
        console.log(photos.url);
        this.itemDiv = document.createElement('div');
        this.itemDiv.classList.add('photo');
        this.image = document.createElement("img");
        this.image.setAttribute("src", photos.url);
        this.itemDiv.appendChild(this.image);
        return this.itemDiv;
    }
}