export class PhayarSarParagraph {
  content: string;
  pronunciation: string;

  constructor(content: string, pronunciation: string) {
    this.content = content;
    this.pronunciation = pronunciation;
  }
}

export class PhayarSarDetail {
  id: number;
  groupId: number;
  title: string;
  content: string;
  sourceId?: string;
  about?: string;
  body?: PhayarSarParagraph[];

  constructor(
    id: number,
    groupId: number,
    title: string,
    content: string,
    sourceId?: string,
    about?: string,
    body?: PhayarSarParagraph[],
  ) {
    this.id = id;
    this.groupId = groupId;
    this.title = title;
    this.content = content;
    this.sourceId = sourceId;
    this.about = about;
    this.body = body;
  }
}
