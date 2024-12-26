import { v4 as uuid } from "uuid";


export type NoteProps = {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};


export class Note {

    private constructor(private readonly props: NoteProps) {};

    public static build(title: string, content: string, userId: string) {
        return new Note({
            id: uuid(),
            title,
            content,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    };

    public static with(props: NoteProps) {
        return new Note(props);
    };

    public get id() {
        return this.props.id;
    };

    public get title() {
        return this.props.title;
    };

    public get content() {
        return this.props.content;
    };

    public get userId() {
        return this.props.userId;
    };

    public get createdAt() {
        return this.props.createdAt;
    };

    public get updatedAt() {
        return this.props.updatedAt;
    };
}
