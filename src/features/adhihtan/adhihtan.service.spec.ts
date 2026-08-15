import { NotFoundException } from '@nestjs/common';
import { AdhihtanService } from './adhihtan.service';

describe('AdhihtanService', () => {
  let service: AdhihtanService;

  beforeEach(() => {
    service = new AdhihtanService();
  });

  it('loads the complete static data set', () => {
    expect(service.getContent().schemaVersion).toBe(1);
    expect(service.getCategories()).toHaveLength(5);
    expect(service.getSpells()).toHaveLength(35);
  });

  it('returns category details and schedules', () => {
    expect(service.getCategory(1).label).toBe('ကိုးနဝင်း');
    expect(service.getSchedules(1)).toHaveLength(9);
    expect(service.getScheduleLevel(1, 1).datasources).toHaveLength(9);
    expect(service.getSchedules(5)).toEqual([]);
  });

  it('normalizes localized spell names', () => {
    expect(service.getSpell(1)).toEqual({
      id: 1,
      key: 'default_spell_1',
      name: 'ဗုဒ္ဓံ သရဏံ ဂစ္ဆမိ',
    });
  });

  it('rejects unknown category, level, and spell identifiers', () => {
    expect(() => service.getCategory(999)).toThrow(NotFoundException);
    expect(() => service.getScheduleLevel(1, 999)).toThrow(NotFoundException);
    expect(() => service.getSpell(999)).toThrow(NotFoundException);
  });
});
