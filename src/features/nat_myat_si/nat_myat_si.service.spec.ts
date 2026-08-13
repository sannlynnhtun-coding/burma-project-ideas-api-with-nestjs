import { NotFoundException } from '@nestjs/common';
import { NatMyatSiService } from './nat_myat_si.service';

describe('NatMyatSiService', () => {
  let service: NatMyatSiService;

  beforeEach(() => {
    service = new NatMyatSiService();
  });

  it('loads all static questions and symbols', () => {
    expect(service.getQuestions()).toHaveLength(100);
    expect(service.getSymbols()).toHaveLength(16);
  });

  it('searches the Myanmar question text', () => {
    const questions = service.getQuestions('အိမ်ထောင်');

    expect(questions.length).toBeGreaterThan(0);
    expect(
      questions.every((question) => question.text.includes('အိမ်ထောင်')),
    ).toBe(true);
  });

  it('returns the reading for a question and symbol', () => {
    expect(service.getReading(1, 'PISCES')).toEqual({
      question: {
        id: 1,
        text: 'ဒီနှစ်အတွင်း အိမ်ထောင်ကျမှာလား။',
      },
      symbol: {
        id: 'pisces',
        name: 'Pisces',
        symbol: '♓',
        row: 1,
        column: 3,
      },
      answer: {
        text: 'အဝေးတစ်နေရာ (သို့) ခရီးသွားရင်း ဖူးစာဆုံ၍ အိမ်ထောင်ကျမည်။',
      },
    });
  });

  it('rejects unknown questions and symbols', () => {
    expect(() => service.getQuestion(999)).toThrow(NotFoundException);
    expect(() => service.getReading(1, 'unknown')).toThrow(NotFoundException);
  });
});
