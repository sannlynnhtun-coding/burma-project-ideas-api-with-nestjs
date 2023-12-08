import {Injectable} from '@nestjs/common';
import {ArtDto} from "./art_dto";
import {GalleryDto} from "./gallery_dto";
import {ArtistDto} from "./artist_dto";

@Injectable()
export class ArtGalleryService {
    getGallery() : GalleryDto[]{
        return [
            {
                "GalleryId": 1,
                "ArtistId": 1,
                "ArtId": 1
            },
            {
                "GalleryId": 2,
                "ArtistId": 1,
                "ArtId": 2
            },
            {
                "GalleryId": 3,
                "ArtistId": 1,
                "ArtId": 3
            },
            {
                "GalleryId": 4,
                "ArtistId": 1,
                "ArtId": 4
            },
            {
                "GalleryId": 5,
                "ArtistId": 1,
                "ArtId": 5
            },
            {
                "GalleryId": 6,
                "ArtistId": 2,
                "ArtId": 6
            },
            {
                "GalleryId": 7,
                "ArtistId": 8,
                "ArtId": 7
            },
            {
                "GalleryId": 8,
                "ArtistId": 3,
                "ArtId": 8
            },
            {
                "GalleryId": 9,
                "ArtistId": 4,
                "ArtId": 9
            },
            {
                "GalleryId": 10,
                "ArtistId": 5,
                "ArtId": 10
            },
            {
                "GalleryId": 11,
                "ArtistId": 6,
                "ArtId": 11
            },
            {
                "GalleryId": 12,
                "ArtistId": 6,
                "ArtId": 12
            },
            {
                "GalleryId": 13,
                "ArtistId": 7,
                "ArtId": 13
            },
            {
                "GalleryId": 14,
                "ArtistId": 7,
                "ArtId": 14
            },
            {
                "GalleryId": 15,
                "ArtistId": 7,
                "ArtId": 15
            },
            {
                "GalleryId": 16,
                "ArtistId": 7,
                "ArtId": 16
            },
            {
                "GalleryId": 17,
                "ArtistId": 7,
                "ArtId": 17
            },
            {
                "GalleryId": 18,
                "ArtistId": 7,
                "ArtId": 18
            },
            {
                "GalleryId": 19,
                "ArtistId": 7,
                "ArtId": 19
            },
            {
                "GalleryId": 20,
                "ArtistId": 7,
                "ArtId": 20
            },
            {
                "GalleryId": 21,
                "ArtistId": 7,
                "ArtId": 21
            },
            {
                "GalleryId": 22,
                "ArtistId": 7,
                "ArtId": 22
            },
            {
                "GalleryId": 23,
                "ArtistId": 7,
                "ArtId": 23
            },
            {
                "GalleryId": 24,
                "ArtistId": 7,
                "ArtId": 24
            }
        ];
    }

    getArt() : ArtDto[]{
        return [
            {
                "ArtId": 1,
                "ArtName": "Marina",
                "ArtDescription": "သူငယ်ချင်း အတွက် အမှတ်တရ ဆွဲပေးထားတာပါ"
            },
            {
                "ArtId": 2,
                "ArtName": "Kudae",
                "ArtDescription": "သူငယ်ချင်း အတွက် အမှတ်တရ ဆွဲပေးထားတာပါ"
            },
            {
                "ArtId": 3,
                "ArtName": "Kudae1",
                "ArtDescription": "သူငယ်ချင်း အတွက် အမှတ်တရ ဆွဲပေးထားတာပါ"
            },
            {
                "ArtId": 4,
                "ArtName": "Kudae2",
                "ArtDescription": "သူငယ်ချင်း အတွက် အမှတ်တရ ဆွဲပေးထားတာပါ"
            },
            {
                "ArtId": 5,
                "ArtName": "3",
                "ArtDescription": "သူငယ်ချင်း အတွက် အမှတ်တရ ဆွဲပေးထားတာပါ"
            },
            {
                "ArtId": 6,
                "ArtName": "Tick Tick Boom",
                "ArtDescription": "အာ့ဇာတ်ကားကြည့်ပီး Andrew Garfield ရဲ့ ဘဝလောကဓံကို ပီပြင်အောင်ရိုက်ထားဝာာ သဘောကျပီး"
            },
            {
                "ArtId": 7,
                "ArtName": "Not Only Doodle",
                "ArtDescription": "nဒီပန်းချီကားကို Doodle ပဲမဟုတ်ဘူး ဆိုတဲ့ခေါင်းစဉ်လေးပေးထားရတဲ့အကြောင်းကတော့ Doodle Art နဲ့ပတ်သတ်ပြီး တစ်ချို့သောသူတွေ အမြင်မှာ Doodle ဟာအခြေခံတွေ မလိုဘူး ပုံဆွဲတတ်ဖို့မလိုဘူး၊ ပုံမဆွဲတတ် ပန်းချီအခြေခံတွေမတတ်လည်း Doodle Art ကိုဖန်တီးလို့ရတယ်ဆိုပေမဲ့ Doodle Art ဆိုတာတကယ်ရှာဖွေနိုင်ရင် အလွန်အင်မတန်မှ စိတ်ဝင်စားစရာကောင်းတဲ့ Art style တစ်မျိုးဖြစ်ပါတယ်။ ရှာဖွေလေတွေ့ရှိလေ၊ လေ့လာလေ နက်နဲလေဆိုတဲ့ အနုပညာတစ်မျိုးပါပဲ။ ပန်းချီကို ပုံစံမျိုးစုံနဲ့ ရှုမြင်လက်ခံကြတဲ့အထဲမှာမှ\nDoodle ဆွဲရင်ပန်းချီဆရာမဟုတ်ဘူး Doodle ပုံ က ပန်းချီကားမဖြစ်နိုင်ဘူး Realism တွေဆွဲမှ ပန်းချီကားဖြစ်တယ်လို့သတ်မှတ်တတ်တဲ့သူများလဲရှိပြီးတော့ Realism တွေကြီးပဲဆွဲရင်လဲ ဓာတ်ပုံကိုပဲကြည့်ပြီးဆွဲတတ်တယ် ကိုယ်ပိုင်ဖန်တီးမှုမရှိဘူး တွေးခေါ်မှုမရှိဘူးဆိုပြီး သတ်မှတ်တတ်သောသူများလဲရှိပါသည်။ ထို့ကြောင့် Doodle Art နဲ့အတူ Realism ဆန်တဲ့ Still life နဲ့ Object တွေကိုပါ ပန်းချီကားထဲတွင် ထည့်သွင်းရေးချယ်ဖို့ ဆုံးဖြတ်ပြီး ဒီပန်းချီကားကို ဖန်တီးဖြစ်ခဲ့ပါတယ်ခင်ဗျာ။"
            },
            {
                "ArtId": 8,
                "ArtName": "Break Up",
                "ArtDescription": "သေကွဲရယ် ၊ ရှင်ကွဲရယ် တစ်နည်းနည်းသောကွဲခြင်းနဲ့ ဆက်ဆံရေးတွေဟာ မတော်တဆကျောခိုင်းရပ်မိကြလိမ့်ဦးမယ်။\nမတည်မြဲခြင်းကြားမှာ ငါတို့ဟာ ပျော်ခဲ့ဖူးမယ် ၊ ငိုခဲ့ဖူးမယ် ၊ လွမ်းခဲ့ဖူးမယ် ၊ ဒေါသတွေလည်းထွက်ခဲ့ဖူးကြမယ်။ \nသမုဒယသစ္စာကိုလက်ကိုင်ထားရင်း နှင်း‌ဆီတွေကြွေတာကိုလည်း ငါတို့တွေ ကြည်ကြည်နူးနူးကြည့်ဖူးကြလိမ့်မယ်။\nဘယ်လိုခံစားပြီးဆွဲထားလဲဆို‌တော့ သီချင်းစာသားတစ်ကြောင်းကို ကြားပြီးတဲ့နောက်မှာ ဒီလိုလေးဆွဲဖို့ idea ရခဲ့ပါတယ်။  ပန်းချီကားရဲ့ အဓိပ္ပာယ်ကတော့ မပြောတော့ဘူးနော်။ ဒီပန်းချီကားကိုကြည့်ရင်းနဲ့ ကြည့်သူမှာပေါ်လာတဲ့ ခံစားချက် ၊ ကြည့်သူ သဘောပေါက်သွားတဲ့ အကြောင်းအရာဟာ သူ့ရဲ့ အဓိပ္ပာယ်ပါပဲ။"
            },
            {
                "ArtId": 9,
                "ArtName": "ဘုံကဖီး",
                "ArtDescription": "ပုံကတော့အသိ ကဗျာဆရာလဲဟုတ် ပန်းချီဆရာလဲဖြစ်တဲ့ ကိုအီလစ်တို့ရဲ့ဘုံကဖီးလေးပါပဲ\nပန်းချီကားလေးအဓိပ္ပာယ်ကတော့ တစ်ပတ်မှာ36နာရီလက်ဖက်ရည်ဆိုင်ထိုင်ခဲ့တယ် \nတစ်ဖြည်းဖြည်းနဲ့ လက်ဖက်ရည်ဆိုင်ကခုံတွေလိုတို့ဘဝတွေပုဝင်နေခဲ့ ဘယ်လိုမှမေ့ပျောက်လို့မရတဲ့နေ့တွေ တစ်ဟုန်းထိုးမောင်းထွက်သွားတဲ့ဘဝတွေ \nတစ်ဘဝလုံးပုံအောခဲ့တဲ့ကစားဝိုင်း ငါတို့အားလုံးရဲ့ ဘုံကဖီးပါပဲ။"
            },
            {
                "ArtId": 10,
                "ArtName": "ကနုဒ",
                "ArtDescription": "ကြာပန်းတို့၏ဟန်ကိုယူ၍ကွေး၊ကော့၊ခွေ၊လိပ် ကာအလှအပတန်ဆာဆင်ထားသောကနုတ်ပန်းများနှင့်ကြာပန်း၏အလှတရားကိုခံစားသက်ဝင်ရင်း..."
            },
            {
                "ArtId": 11,
                "ArtName": "rose , nightingale and a song",
                "ArtDescription": "သီချင်းဆိုရတာကြိုက်တာမို့ပါ။ ပန်းကလဲနှင်းဆီပန်းကြိုက်လို့ပါ။"
            },
            {
                "ArtId": 12,
                "ArtName": "midnight dream",
                "ArtDescription": "About the dream of young people \ncovid နဲ့ politics အခြေနေတွေခက်ခက်ခဲခဲဖြတ်ကျော်ခဲ့ရတဲ့လူငယ်တွေအတွက်ပါ။"
            },
            {
                "ArtId": 13,
                "ArtName": "စပါးဝါရွှေဝင်းပါစေ",
                "ArtDescription": null
            },
            {
                "ArtId": 14,
                "ArtName": "ပန်းတွေသင်းပါစေ",
                "ArtDescription": null
            },
            {
                "ArtId": 15,
                "ArtName": "ငှက်ကလေးတွေမိုးတိမ်ကြားပျံနိုင်ကြစေသား",
                "ArtDescription": null
            },
            {
                "ArtId": 16,
                "ArtName": "နေရောင်ခြည်လည်းဖွေးပါစေ",
                "ArtDescription": null
            },
            {
                "ArtId": 17,
                "ArtName": "လေပြည်အေးပါစေ",
                "ArtDescription": null
            },
            {
                "ArtId": 18,
                "ArtName": "ချစ်မိတ်ဆွေပေါင်းဖော်များကျန်းမာကြစေသား",
                "ArtDescription": null
            },
            {
                "ArtId": 19,
                "ArtName": "ရွှေရင်အေး",
                "ArtDescription": null
            },
            {
                "ArtId": 20,
                "ArtName": "🍔",
                "ArtDescription": null
            },
            {
                "ArtId": 21,
                "ArtName": "🍹🍸",
                "ArtDescription": null
            },
            {
                "ArtId": 22,
                "ArtName": "🥐🥖🥯",
                "ArtDescription": null
            },
            {
                "ArtId": 23,
                "ArtName": "မွင်းဂါး",
                "ArtDescription": null
            },
            {
                "ArtId": 24,
                "ArtName": "🍷",
                "ArtDescription": null
            }
        ];
    }

    getArtist() : ArtistDto[]{
        return [
            {
                "ArtistId": 1,
                "ArtistName": "M Marina",
                "Social": [
                    {
                        "Name": "facebook",
                        "Link": "https://www.facebook.com/profile.php?id=100090137542974"
                    },
                    {
                        "Name": "instagram",
                        "Link": ""
                    }
                ]
            },
            {
                "ArtistId": 2,
                "ArtistName": "Yell Zaw Hlaing",
                "Social": [
                    {
                        "Name": "facebook",
                        "Link": "https://www.facebook.com/profile.php?id=100082413631418"
                    },
                    {
                        "Name": "instagram",
                        "Link": ""
                    }
                ]
            },
            {
                "ArtistId": 3,
                "ArtistName": "Yoon Na Di",
                "Social": [
                    {
                        "Name": "facebook",
                        "Link": "https://www.facebook.com/profile.php?id=100072272035447"
                    },
                    {
                        "Name": "instagram",
                        "Link": ""
                    }
                ]
            },
            {
                "ArtistId": 4,
                "ArtistName": "Zenkei",
                "Social": [
                    {
                        "Name": "facebook",
                        "Link": "https://www.facebook.com/profile.php?id=100055981076790"
                    },
                    {
                        "Name": "instagram",
                        "Link": ""
                    }
                ]
            },
            {
                "ArtistId": 5,
                "ArtistName": "Thiri",
                "Social": [
                    {
                        "Name": "facebook",
                        "Link": "https://www.facebook.com/profile.php?id=100070586672129"
                    },
                    {
                        "Name": "instagram",
                        "Link": ""
                    }
                ]
            },
            {
                "ArtistId": 6,
                "ArtistName": "Thinthazin",
                "Social": [
                    {
                        "Name": "facebook",
                        "Link": "https://www.facebook.com/thin.thazin.39904"
                    },
                    {
                        "Name": "instagram",
                        "Link": ""
                    }
                ]
            },
            {
                "ArtistId": 7,
                "ArtistName": "Theè Oo",
                "Social": [
                    {
                        "Name": "facebook",
                        "Link": "https://www.facebook.com/theeoosartvenue"
                    },
                    {
                        "Name": "instagram",
                        "Link": "https://www.instagram.com/theeoothazin"
                    }
                ]
            },
            {
                "ArtistId": 8,
                "ArtistName": "Edgar",
                "Social": [
                    {
                        "Name": "facebook",
                        "Link": "https://www.facebook.com/profile.php?id=100044790408299"
                    },
                    {
                        "Name": "instagram",
                        "Link": ""
                    }
                ]
            }
        ];
    }
}
