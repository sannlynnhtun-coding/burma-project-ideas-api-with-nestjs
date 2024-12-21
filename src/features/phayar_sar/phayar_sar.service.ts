import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PhayarSarTitle } from "./phayar_sar_title";
import { PhayarSarDetail } from './phayar_sar_detail';

@Injectable()
export class PhayarSarService {
    private data: any[];

    constructor() {
        this.loadData();
    }

    private loadData() {
        const projectRoot = path.join(__dirname, '..', '..');
        const filePath = path.join(projectRoot.replace("\dist", ''), 'public', 'phayar-sar', 'data.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        this.data = JSON.parse(jsonData.trim());
        // console.log(this.data);
    }

    getTitles(): PhayarSarTitle[] {
        return this.data.map((group: any) => new PhayarSarTitle(group.groupId, group.title, group.data));
    }

    getDetails(groupId: number, detailId: number): PhayarSarDetail {
        try {
            const group = this.data.find((group: any) => group.groupId === groupId);

            if (!group) {
                throw new NotFoundException(`Group with ID ${groupId} not found`);
            }

            const projectRoot = path.join(__dirname, '..', '..');
            const filePath = path.join(projectRoot.replace("\dist", ''), 'public', 'phayar-sar',
                groupId.toString(), detailId.toString() + '.json');
            const jsonData = fs.readFileSync(filePath, 'utf8');
            const detail = JSON.parse(jsonData.trim());

            return new PhayarSarDetail(detail.id, detail.groupId, detail.title, detail.content);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

