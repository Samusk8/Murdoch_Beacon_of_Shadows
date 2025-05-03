export class Post {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    mostrarPost() {
        return `
            <div class="post">
                <div class="nom5">
                    <p>${this.title}</p>
                    <p>${this.content}</p>
                </div>
            </div>
        `;
    }
}