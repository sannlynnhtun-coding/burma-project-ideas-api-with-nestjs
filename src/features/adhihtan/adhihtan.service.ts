import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { getPublicRoot } from '../../static-assets';
import {
  AdhihtanCategory,
  AdhihtanContent,
  AdhihtanScheduleLevel,
  AdhihtanSpell,
} from './adhihtan';

@Injectable()
export class AdhihtanService {
  private readonly content: AdhihtanContent;
  private readonly categoriesById: Map<number, AdhihtanCategory>;
  private readonly spells: AdhihtanSpell[];
  private readonly spellsById: Map<number, AdhihtanSpell>;

  constructor() {
    const dataPath = path.join(getPublicRoot(), 'adhihtan', 'data.json');

    this.content = JSON.parse(
      fs.readFileSync(dataPath, 'utf8'),
    ) as AdhihtanContent;
    this.categoriesById = new Map(
      this.content.categories.map((category) => [category.value, category]),
    );
    this.spells = Object.entries(this.content.localizedSpellNames)
      .map(([key, name]) => ({
        id: this.getSpellId(key),
        key,
        name,
      }))
      .sort((left, right) => left.id - right.id);
    this.spellsById = new Map(this.spells.map((spell) => [spell.id, spell]));
  }

  getContent(): AdhihtanContent {
    return this.content;
  }

  getCategories(): AdhihtanCategory[] {
    return this.content.categories;
  }

  getCategory(categoryId: number): AdhihtanCategory {
    const category = this.categoriesById.get(categoryId);

    if (!category) {
      throw new NotFoundException(
        `Adhihtan category with ID ${categoryId} not found`,
      );
    }

    return category;
  }

  getSchedules(categoryId: number): AdhihtanScheduleLevel[] {
    this.getCategory(categoryId);
    return this.content.schedules[categoryId.toString()] ?? [];
  }

  getScheduleLevel(categoryId: number, levelId: number): AdhihtanScheduleLevel {
    const level = this.getSchedules(categoryId).find(
      (scheduleLevel) => scheduleLevel.value === levelId,
    );

    if (!level) {
      throw new NotFoundException(
        `Adhihtan schedule level ${levelId} for category ${categoryId} not found`,
      );
    }

    return level;
  }

  getSpells(): AdhihtanSpell[] {
    return this.spells;
  }

  getSpell(spellId: number): AdhihtanSpell {
    const spell = this.spellsById.get(spellId);

    if (!spell) {
      throw new NotFoundException(
        `Adhihtan localized spell with ID ${spellId} not found`,
      );
    }

    return spell;
  }

  private getSpellId(key: string): number {
    const match = /^default_spell_(\d+)$/.exec(key);

    if (!match) {
      throw new Error(`Unsupported Adhihtan spell key: ${key}`);
    }

    return Number.parseInt(match[1], 10);
  }
}
