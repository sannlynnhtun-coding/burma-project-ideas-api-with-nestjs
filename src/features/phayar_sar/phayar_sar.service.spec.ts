import { NotFoundException } from '@nestjs/common';
import { PhayarSarService } from './phayar_sar.service';

describe('PhayarSarService', () => {
  let service: PhayarSarService;

  beforeEach(() => {
    service = new PhayarSarService();
  });

  it('includes the prayers imported from the PhayarSar app', () => {
    const groups = service.getTitles();
    const prayerCount = groups.reduce(
      (count, group) => count + group.data.length,
      0,
    );

    expect(groups).toHaveLength(9);
    expect(prayerCount).toBe(42);
    expect(groups.find((group) => group.groupId === 8)?.data).toHaveLength(7);
    expect(groups.find((group) => group.groupId === 9)?.data).toHaveLength(2);
  });

  it('retains the imported about and pronunciation fields', () => {
    const detail = service.getDetails(8, 3);

    expect(detail.sourceId).toBe('Dhammacakka');
    expect(detail.title).toBe('ဓမ္မစကြာသုတ်');
    expect(detail.about).toContain('ဓမ္မစကြာသုတ်');
    expect(detail.content).toContain(detail.body[0].content);
    expect(detail.body).toHaveLength(35);
    expect(detail.body[0]).toEqual(
      expect.objectContaining({
        content: expect.any(String),
        pronunciation: expect.any(String),
      }),
    );
  });

  it('throws when a prayer is not in the catalog', () => {
    expect(() => service.getDetails(8, 99)).toThrow(NotFoundException);
    expect(() => service.getDetails(99, 1)).toThrow(NotFoundException);
  });
});
