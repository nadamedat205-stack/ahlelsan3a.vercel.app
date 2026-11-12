/**
 * أهل الصنعة - سكريبت الموقع التفاعلي
 * Ahel El-Sanaa - Main JavaScript
 */

// 1. Lenis Smooth Scroll (آمن ولا يسبب أخطاء إذا لم تتوفر المكتبة)
let lenis = null;
if (typeof Lenis !== 'undefined') {
    try {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smoothWheel: true,
            smoothTouch: false
        });

        function raf(time) {
            if (lenis) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
        }
        requestAnimationFrame(raf);
    } catch (e) {
        console.warn('Lenis smooth scroll initialization skipped:', e);
    }
}

// 2. GSAP Animations on Load
if (typeof gsap !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        try {
            if (document.querySelector(".hero-badge")) {
                gsap.from(".hero-badge", { opacity: 0, y: -20, duration: 0.8, delay: 0.2 });
            }
            if (document.querySelector(".hero h2")) {
                gsap.from(".hero h2", { opacity: 0, y: 30, duration: 1, delay: 0.4 });
            }
            if (document.querySelector(".hero p")) {
                gsap.from(".hero p", { opacity: 0, y: 20, duration: 1, delay: 0.6 });
            }
            if (document.querySelector(".search-box-wrapper")) {
                gsap.from(".search-box-wrapper", { opacity: 0, scale: 0.95, duration: 1, delay: 0.8 });
            }
        } catch (e) {
            console.warn('GSAP animation skipped:', e);
        }
    });
}

// إنشاء بيانات الفنيين بطريقة موحدة
function createPerson(id, name, job, location, experience, phone, specialties) {
    return {
        id,
        name,
        initials: name.trim().slice(0, 2),
        job,
        location,
        experience,
        phone,
        rating: "4.8",
        specialties
    };
}

// إنشاء التخصص
function createCategory(title, description, peopleTitle, people) {
    return {
        title,
        label: "التخصصات الفنية",
        description,
        peopleTitle,
        people
    };
}

const categories = {
    // 1 - إشراف هندسي (بياناتك الأصلية)
    "اشراف هندسى": {
        title: "اشراف هندسى",
        label: "التخصصات الهندسية",
        description: "اختاري المهندس المناسب لمشروعك بأعلى كفاءة",
        peopleTitle: "المهندسين المتاحين",
        people: [{
            id: 1,
            name: "م. ماجد فتحى",
            initials: "مف",
            image: "imge/maged.jpg",
            job: "مهندس إشراف هندسي ومعماري",
            location: "القاهرة - مدينة الشروق",
            experience: "10 سنوات خبرة",
            phone: "01117837187",
            rating: "4.9",
            specialties: ["إشراف وتنفيذ", "مطابقة المواصفات", "استلام مراحل التشطيب"]
        }]
    },

    // 2 - الهدم والتكسير (بياناتك الأصلية)
    "الهدم والتكسير": {
        title: "الهدم والتكسير",
        label: "التخصصات الفنية",
        description: "أفضل فنيي ومقاولي الهدم والتكسير",
        peopleTitle: "المتخصصين المتاحين",
        people: [
            {
                id: 4,
                name: "محمد احمد",
                initials: "م ا",
                job: "مقاول هدم وتكسير ",
                location: "القاهرة - حلوان والمعادي",
                experience: "5 سنوات خبرة",
                phone: "01152648914",
                rating: "4.8",
                specialties: ["تكسير حوائط وأرضيات", "قص خرسانات بالصاروخ", "ترحيل الركام"]
            },
            
        ]
    },

    // 3 - أعمال البناء
    "اعمال البناء": createCategory(
        "أعمال البناء",
        "متخصصون في أعمال البناء والتشييد وبناء الحوائط",
        "البنائين المتاحين",
        [
            createPerson(8, "أبو زياد البنا", "معلم بناء ومباني", "القاهرة - مدينة نصر", "4 سنة خبرة", "01116510408", 
                ["بناء الطوب الأحمر", "بناء الطوب الأسمنتي", "تأسيس الحوائط"]),
        ]
    ),

    // 4 - أعمال السباكة
    "اعمال السباكه": createCategory(
        "أعمال السباكة",
        "تأسيس وتشطيب شبكات المياه والصرف الصحي",
        "السباكين المتاحين",
        [
            createPerson(11, "عم كمال السباك", "فني تأسيس وتشطيب  السباكه", "القاهرة - مدينة نصر", "7 سنة خبرة", "01225528610", ["تأسيس مواسير المياه", "تركيب الأدوات الصحية", "اختبار ضغط المياه"]),
        ]
    ),

    // 5 - الكهرباء
    "الكهرباء": createCategory(
        "الكهرباء",
        "تأسيس وصيانة الكهرباء المنزلية وأنظمة الإضاءة",
        "الكهربائيين المتاحين",
        [
            createPerson(14, "حمدى الكهربائ", "فني تأسيس وصيانة كهرباء", "القاهرة - المعادي", "4سنة خبرة", "01229680158",
                 ["تأسيس الأسلاك", "تركيب لوحات الكهرباء", "تقسيم الأحمال"]),
        ]
    ),

    // 6 - التكيفات
    "التكيفات": createCategory(
        "تركيب التكيفات",
        "فنيون متخصصون في تركيب وصيانة أجهزة التكييف",
        "فنيي التكييف المتاحين",
        [
            createPerson(17, "عمى احمد تكييف", "فني تركيب وصيانة تكييفات", "القاهرة - التجمع", "8 سنوات خبرة", "01018851707",
                 ["تركيب التكييفات", "تنظيف الفلاتر", "صيانة الأعطال"]),
        ]
    ),

    // 7 - المحارة والتبيض
    "المحاره التبيض": createCategory(
        "المحارة والتبييض",
        "أعمال المحارة والتأسيس وتسوية الحوائط والأسقف",
        "معلمين المحارة المتاحين",
        [
            createPerson(20, "عبد الله حسن", "معلم محارة وتشطيبات", "القاهرة - الشروق", "15 سنة خبرة", "01000000013", ["محارة الحوائط", "محارة الأسقف", "تجهيز الأسطح"]),
            createPerson(21, "سيد محمد", "فني محارة وبياض", "الجيزة - الهرم", "10 سنوات خبرة", "01000000014", ["البياض الداخلي", "البياض الخارجي", "تسوية الحوائط"]),
            createPerson(22, "خالد إبراهيم", "مقاول محارة", "القاهرة - المعادي", "12 سنة خبرة", "01000000015", ["محارة الشقق", "محارة الفيلات", "معالجة الشروخ"])
        ]
    ),

    // 8 - الجبس امبورد
    "اعمال الجبس امبورد": createCategory(
        "أعمال الجبس امبورد",
        "تصميم وتركيب الأسقف والحوائط الجبسية",
        "فنيي الجبس امبورد المتاحين",
        [
            createPerson(23, "طارق علي", "فني تركيب جبس امبورد", "القاهرة - التجمع", "9 سنوات خبرة", "01000000016", ["أسقف معلقة", "قواطيع جبس", "بيت نور"]),
            createPerson(24, "محمود فتحي", "معلم جبس بورد وديكورات", "الجيزة - أكتوبر", "11 سنة خبرة", "01000000017", ["تصميمات الأسقف", "إضاءة مخفية", "ديكورات الحوائط"]),
            createPerson(25, "إسلام حسن", "فني تشطيبات جبسية", "القاهرة - مدينة نصر", "7 سنوات خبرة", "01000000018", ["تركيب الجبس بورد", "صيانة الأسقف", "تشطيب الفواصل"])
        ]
    ),

    // 9 - الشفاطات الهوائية
    "اعمال الشفاط الهوائ": createCategory(
        "أعمال الشفطات الهوائية",
        "تركيب أنظمة الشفط والتهوية للمطابخ والحمامات",
        "فنيي الشفاطات المتاحين",
        [
            createPerson(26, "محمود رجب", "فني تركيب شفاطات وتهوية", "القاهرة - مدينة نصر", "8 سنوات خبرة", "01000000019", ["تركيب شفاطات", "تمديد مجاري الهواء", "تهوية الحمامات"]),
            createPerson(27, "أحمد صابر", "فني دكت وشفاطات", "الجيزة - الدقي", "10 سنوات خبرة", "01000000020", ["تركيب الدكت", "شفاطات المطاعم", "صيانة مراوح الشفط"]),
            createPerson(28, "مصطفى عادل", "فني أنظمة تهوية", "القاهرة - المعادي", "6 سنوات خبرة", "01000000021", ["أنظمة التهوية", "تركيب المراوح", "تنظيف مجاري الهواء"])
        ]
    ),

    // 10 - أعمال الكور
    "اعمال الكور": createCategory(
        "أعمال الكور",
        "تخريم وقص الخرسانة لتمرير المواسير والخدمات",
        "فنيي الكور المتاحين",
        [
            createPerson(29, "حسام علي", "فني تخريم كور خرسانة", "القاهرة - التجمع", "10 سنوات خبرة", "01000000022", ["تخريم الخرسانة", "فتحات المواسير", "تخريم الأسقف"]),
            createPerson(30, "إبراهيم سعيد", "متخصص قص وتخريم خرسانة", "الجيزة - أكتوبر", "8 سنوات خبرة", "01000000023", ["تخريم الجدران", "فتحات التكييف", "معدات تخريم حديثة"]),
            createPerson(31, "وليد حسن", "مقاول أعمال كور", "القاهرة - المعادي", "12 سنة خبرة", "01000000024", ["تخريم الكمرات حسب التصميم", "فتحات الخدمات", "قص الخرسانة"])
        ]
    ),

    // 11 - السيراميك
    "اعمال السيراميك": createCategory(
        "أعمال السيراميك",
        "تركيب السيراميك والبورسلين والأرضيات",
        "فنيي السيراميك المتاحين",
        [
            createPerson(32, "فرج المصري", "معلم تركيب سيراميك وبورسلين", "القاهرة - المقطم", "13 سنة خبرة", "01000000025", ["تركيب السيراميك", "تركيب البورسلين", "قص 45 درجة"]),
            createPerson(33, "خالد عبد الوهاب", "فني أرضيات بورسلين", "الجيزة - أكتوبر", "10 سنوات خبرة", "01000000026", ["بورسلين كبير الحجم", "سيراميك باركيه", "عزل الحمامات"]),
            createPerson(34, "تامر سلامة", "فني سيراميك حمامات ومطابخ", "القاهرة - عين شمس", "8 سنوات خبرة", "01000000027", ["تركيب سيراميك الحمامات", "تركيب المطابخ", "معالجة الميول"])
        ]
    ),

    // 12 - الدهانات
    "اعكال الدهانات": createCategory(
        "أعمال الدهانات",
        "دهانات داخلية وخارجية وديكورات بألوان عصرية",
        "النقاشين المتاحين",
        [
            createPerson(35, "ياسر فتحي", "معلم دهانات وديكورات", "القاهرة - مصر الجديدة", "11 سنة خبرة", "01000000028", ["دهانات قطيفة", "تأسيس المعجون", "تشطيب الفلل"]),
            createPerson(36, "طارق عثمان", "فني دهانات وبلاستيك", "الجيزة - الدقي", "8 سنوات خبرة", "01000000029", ["مطابقة الألوان", "معالجة الرطوبة", "ورق الحائط"]),
            createPerson(37, "حسام الديب", "نقاش تشطيبات سوبر لوكس", "الإسكندرية - سموحة", "6 سنوات خبرة", "01000000030", ["دهانات إيبوكسي", "تشطيبات فاخرة", "دهانات حديثة"])
        ]
    ),

    // 13 - التجاليد والديكور
    "اعمال التجاليد والديكور": createCategory(
        "أعمال التجاليد والديكور",
        "تجاليد الحوائط والبدائل والديكورات الداخلية",
        "فنيي التجاليد والديكور المتاحين",
        [
            createPerson(38, "ماهر السيد", "فني تجاليد وديكورات", "القاهرة - التجمع", "10 سنوات خبرة", "01000000031", ["تجاليد بديل الخشب", "بديل الرخام", "ديكورات الحوائط"]),
            createPerson(39, "أحمد جابر", "فني تركيب ألواح ديكورية", "الجيزة - المهندسين", "7 سنوات خبرة", "01000000032", ["تركيب ألواح PVC", "تجاليد الحوائط", "فواصل ديكورية"]),
            createPerson(40, "كريم عادل", "معلم ديكورات داخلية", "القاهرة - الشروق", "9 سنوات خبرة", "01000000033", ["ديكورات مودرن", "بانوهات الحوائط", "بديل الخشب"])
        ]
    ),

    // 14 - البيوتات
    "اعمال البتوهات": createCategory(
        "أعمال البتوهات",
        "تنفيذ أعمال البيوتات والتفاصيل المعمارية والخرسانية",
        "فنيي البيوتات المتاحين",
        [
            createPerson(41, "سامي إبراهيم", "فني تنفيذ بيوتات", "القاهرة - مدينة نصر", "9 سنوات خبرة", "01000000034", ["تنفيذ البيوتات", "تجهيز الفتحات", "تشطيب التفاصيل"]),
            createPerson(42, "محمد رجب", "معلم أعمال خرسانية", "الجيزة - فيصل", "12 سنة خبرة", "01000000035", ["أعمال خرسانة", "تجهيز القوالب", "تنفيذ التفاصيل"]),
            createPerson(43, "أحمد سمير", "فني تشطيبات معمارية", "القاهرة - المعادي", "8 سنوات خبرة", "01000000036", ["تجهيز البيوتات", "التشطيب", "معالجة العيوب"])
        ]
    ),

    // 15 - الرخام
    "اعمال الرخام": createCategory(
        "أعمال الرخام",
        "توريد وتركيب الرخام والجرانيت والسلالم",
        "فنيي الرخام المتاحين",
        [
            createPerson(44, "عادل حسن", "معلم تركيب رخام وجرانيت", "القاهرة - المعادي", "15 سنة خبرة", "01000000037", ["تركيب رخام الأرضيات", "رخام السلالم", "جرانيت المطابخ"]),
            createPerson(45, "أشرف كمال", "فني تقطيع وتشطيب رخام", "الجيزة - أكتوبر", "10 سنوات خبرة", "01000000038", ["تقطيع الرخام", "تلميع الرخام", "تركيب الأحواض"]),
            createPerson(46, "سعيد محمود", "فني رخام وواجهات", "القاهرة - الشروق", "8 سنوات خبرة", "01000000039", ["واجهات الرخام", "رخام الحمامات", "صيانة وتلميع"])
        ]
    ),

    // 16 - السوكريت
    "اعمال السوكريت": createCategory(
        "أعمال السوكريت",
        "تنفيذ وتسوية أرضيات السوكريت وتجهيز الأسطح",
        "فنيي السوكريت المتاحين",
        [
            createPerson(47, "حمدي علي", "فني تنفيذ سوكريت", "القاهرة - مدينة نصر", "10 سنوات خبرة", "01000000040", ["تنفيذ السوكريت", "تسوية الأرضيات", "تجهيز الأسطح"]),
            createPerson(48, "محمود رجب", "مقاول أرضيات", "الجيزة - أكتوبر", "12 سنة خبرة", "01000000041", ["أرضيات صناعية", "تجهيز الخرسانة", "معالجة الأرضيات"]),
            createPerson(49, "إبراهيم حسن", "فني تشطيب أرضيات", "القاهرة - المعادي", "7 سنوات خبرة", "01000000042", ["تسوية الأرضيات", "أعمال السوكريت", "تشطيب الأسطح"])
        ]
    ),

    // 17 - المطابخ
    "اعمال المطابخ": createCategory(
        "أعمال المطابخ",
        "تصميم وتنفيذ وتركيب المطابخ بمختلف الخامات",
        "فنيي المطابخ المتاحين",
        [
            createPerson(50, "مجدي النجار", "نجار مطابخ وأبواب", "القاهرة - الزيتون", "15 سنة خبرة", "01000000043", ["مطابخ خشب", "تفصيل وحدات", "تركيب المفصلات"]),
            createPerson(51, "أشرف عبد العزيز", "معلم نجارة موبيليا", "دمياط والقاهرة", "18 سنة خبرة", "01000000044", ["مطابخ حسب الطلب", "دريسنج روم", "خشب طبيعي"]),
            createPerson(52, "هاني فريد", "فني مطابخ وأبواب سحاب", "الجيزة - المهندسين", "8 سنوات خبرة", "01000000045", ["تركيب المطابخ", "أبواب سحاب", "صيانة المفصلات"])
        ]
    ),

    // 18 - الزخارف الجبسية
    "الزخارف الجبسيه": createCategory(
        "أعمال الزخارف الجبسية",
        "تنفيذ الزخارف والكرانيش والديكورات الجبسية",
        "فنيي الزخارف الجبسية المتاحين",
        [
            createPerson(53, "مصطفى حسن", "فني زخارف وكرانيش جبسية", "القاهرة - مصر الجديدة", "12 سنة خبرة", "01000000046", ["كرانيش جبس", "زخارف الأسقف", "إطارات الحوائط"]),
            createPerson(54, "أحمد رجب", "معلم ديكورات جبسية", "الجيزة - الهرم", "9 سنوات خبرة", "01000000047", ["زخارف كلاسيكية", "وردات جبسية", "أعمدة ديكورية"]),
            createPerson(55, "حسام محمود", "فني تشكيل جبس", "القاهرة - الشروق", "7 سنوات خبرة", "01000000048", ["تشكيل الجبس", "كرانيش مودرن", "ترميم الزخارف"])
        ]
    ),

    // 19 - GRC و GRP
    "اعمال grc,grp": createCategory(
        "أعمال GRC و GRP",
        "تصميم وتنفيذ وتركيب وحدات وواجهات GRC وGRP",
        "فنيي GRC وGRP المتاحين",
        [
            createPerson(56, "محمود عادل", "فني تركيب واجهات GRC", "القاهرة - التجمع", "12 سنة خبرة", "01000000049", ["واجهات GRC", "كرانيش خارجية", "وحدات ديكورية"]),
            createPerson(57, "كريم السيد", "متخصص تصنيع وتركيب GRP", "الجيزة - أكتوبر", "9 سنوات خبرة", "01000000050", ["وحدات GRP", "قوالب فيبر جلاس", "ديكورات خارجية"]),
            createPerson(58, "أحمد فتحي", "مقاول أعمال GRC وGRP", "القاهرة - الشروق", "10 سنوات خبرة", "01000000051", ["تصنيع الوحدات", "تركيب الواجهات", "تشطيب الزخارف"])
        ]
    )
};


// خريطة لتسوية مسميات التخصصات (Normalization Map)
const categoryAliases = {
    "اشراف هندسى": "اشراف هندسى",
    "إشراف هندسي": "اشراف هندسى",
    "اشراف هندسي": "اشراف هندسى",
    "الهندسه": "اشراف هندسى",
    "الهندسة": "اشراف هندسى",
    "هندسة": "اشراف هندسى",
    "مهندسين واستشاريين": "مهندسين واستشاريين",
    "مهندسين": "مهندسين واستشاريين",
    "استشاريين": "مهندسين واستشاريين",
    "الهدم والتكسير": "الهدم والتكسير",
    "اعمال الهدم والتكسير": "الهدم والتكسير",
    "أعمال الهدم والتكسير": "الهدم والتكسير",
    "اعمال الهدم": "الهدم والتكسير",
    "هدم وتكسير": "الهدم والتكسير",
    "هدم": "الهدم والتكسير",
    "تكسير": "الهدم والتكسير",
    "نقاشة": "نقاشة ودهانات",
    "نقاشة ودهانات": "نقاشة ودهانات",
    "الدهانات": "نقاشة ودهانات",
    "دهانات": "نقاشة ودهانات",
    "نجارة": "نجارين وأبواب وشباك",
    "نجارين": "نجارين وأبواب وشباك",
    "نجارين وأبواب وشباك": "نجارين وأبواب وشباك",
    "سيراميك": "سيراميك وبلاط",
    "سيراميك وبلاط": "سيراميك وبلاط",
    "السيراميك": "سيراميك وبلاط",
    "بلاط": "سيراميك وبلاط",
    "سباكة": "سباكة",
    "سباكه": "سباكة",
    "السباكة": "سباكة",
    "كهرباء": "كهرباء",
    "الكهرباء": "كهرباء"
};

// دالة لتنظيف النص العربي للبحث والمطابقة
function normalizeArabic(text) {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[إأآا]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/[\u064B-\u065F]/g, ''); // إزالة التشكيل
}

// استخراج الجذور التقريبية للكلمات لمطابقة أشكال الجموع والمؤنث
function getStemWords(text) {
    if (!text) return [];
    return normalizeArabic(text)
        .split(/[\s,،\-]+/)
        .filter(w => w.length >= 2)
        .map(w => w.replace(/^(ال|و)/, '').replace(/(ه|ي|ين|ون|ات|ان)$/, ''))
        .filter(w => w.length >= 2);
}

// دالة لجلب كائن التخصص مع دعم أسماء بديلة
function getCategoryData(name) {
    if (!name) return categories["اشراف هندسى"];
    if (categories[name]) return categories[name];

    const cleanName = name.trim();
    if (categoryAliases[cleanName] && categories[categoryAliases[cleanName]]) {
        return categories[categoryAliases[cleanName]];
    }

    const normInput = normalizeArabic(cleanName);
    for (const key in categories) {
        if (normalizeArabic(key) === normInput) {
            return categories[key];
        }
    }
    for (const alias in categoryAliases) {
        if (normalizeArabic(alias) === normInput) {
            const target = categoryAliases[alias];
            if (categories[target]) return categories[target];
        }
    }

    // مطابقة بالجذور
    const inputStems = getStemWords(cleanName);
    for (const key in categories) {
        const keyStems = getStemWords(key);
        if (inputStems.some(s => keyStems.some(k => k.includes(s) || s.includes(k)))) {
            return categories[key];
        }
    }

    // Fallback ديناميكي إذا كان التخصص مسجلاً في القائمة المنسدلة بدون بيانات مسجلة بعد
    return {
        label: "التخصصات المتاحة",
        description: `اختر المتخصص المناسب في تخصص ${cleanName}`,
        peopleTitle: `المتخصصين المتاحين في ${cleanName}`,
        people: []
    };
}

// 4. منطق البحث والفلترة في الصفحة الرئيسية
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const searchCategory = document.getElementById('searchCategory');
const searchCity = document.getElementById('searchCity');
const categoryCards = document.querySelectorAll('.category-card');
const proCards = document.querySelectorAll('.pro-card');

function cardMatchesQuery(cardText, query) {
    if (!query) return true;
    const normCard = normalizeArabic(cardText);
    const normQuery = normalizeArabic(query);
    if (normCard.includes(normQuery)) return true;

    const queryStems = getStemWords(query);
    const cardStems = getStemWords(cardText);
    return queryStems.some(qs => cardStems.some(cs => cs.includes(qs) || qs.includes(cs)));
}

function performSearch() {
    const textVal = searchInput ? searchInput.value.trim() : '';
    const catVal = searchCategory ? searchCategory.value.trim() : '';

    if (catVal) {
        window.location.href = `category.html?category=${encodeURIComponent(catVal)}`;
        return;
    }

    if (categoryCards.length) {
        let matchCount = 0;
        categoryCards.forEach(card => {
            const isMatch = cardMatchesQuery(card.innerText, textVal);
            if (isMatch) {
                card.style.display = 'flex';
                matchCount++;
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(card, { opacity: 0.5, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
                }
            } else {
                card.style.display = 'none';
            }
        });

        // إذا لم يكن هناك بطاقات مطابقة وكان هناك نص بحث، نوجه لصفحة التخصص
        if (matchCount === 0 && textVal) {
            window.location.href = `category.html?category=${encodeURIComponent(textVal)}`;
            return;
        }

        const categoriesSection = document.getElementById('categories');
        if (categoriesSection) {
            categoriesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
}

if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });

    // فلترة فورية أثناء الكتابة
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (categoryCards.length) {
            categoryCards.forEach(card => {
                const isMatch = cardMatchesQuery(card.innerText, query);
                card.style.display = isMatch ? 'flex' : 'none';
            });
        }
    });
}

if (searchCategory) {
    searchCategory.addEventListener('change', () => {
        const selectedVal = searchCategory.value.trim();
        if (selectedVal && categoryCards.length) {
            let anyMatch = false;
            categoryCards.forEach(card => {
                const isMatch = cardMatchesQuery(card.innerText, selectedVal);
                card.style.display = isMatch ? 'flex' : 'none';
                if (isMatch) anyMatch = true;
            });
            if (!anyMatch && selectedVal) {
                window.location.href = `category.html?category=${encodeURIComponent(selectedVal)}`;
            }
        } else if (!selectedVal && categoryCards.length) {
            categoryCards.forEach(card => card.style.display = 'flex');
        }
    });
}

// دالة مساعدة لربط كروت الأقسام بالبحث
function filterByCat(cat) {
    if (searchCategory) {
        searchCategory.value = cat;
    }
    window.location.href = `category.html?category=${encodeURIComponent(cat)}`;
}

// 5. زر القائمة المتنقلة (Mobile Hamburger Menu)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'فتح القائمة');

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileMenuBtn.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (isOpen) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        }
    });

    // إغلاق القائمة عند النقر على أي رابط
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        }
    });
}

// 6. شريط التنقل السفلي في الموبايل (Mobile Bottom Navigation)
const bottomNavLinks = document.querySelectorAll('.mobile-bottom-nav a');
if (bottomNavLinks.length) {
    bottomNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            bottomNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // تحديث التاب النشط عند التمرير
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 200;
        const sections = [
            { id: 'join', link: document.querySelector('.mobile-bottom-nav a[href="#join"]') },
            { id: 'categories', link: document.querySelector('.mobile-bottom-nav a[href="#categories"]') },
            { id: 'home', link: document.querySelector('.mobile-bottom-nav a[href="#home"]') }
        ];

        for (const item of sections) {
            const sec = document.getElementById(item.id);
            if (sec && item.link) {
                const top = sec.offsetTop;
                const height = sec.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    bottomNavLinks.forEach(l => l.classList.remove('active'));
                    item.link.classList.add('active');
                    break;
                }
            }
        }
    }, { passive: true });
}

// 7. منطق صفحة التخصصات (category.html)
function initCategoryPage() {
    const engineersGrid = document.getElementById("engineersGrid");
    if (!engineersGrid) return;

    const categoryParams = new URLSearchParams(window.location.search);
    const rawCategoryName = categoryParams.get("category");
    const categoryName = rawCategoryName ? rawCategoryName.trim() : "اشراف هندسى";
    const category = getCategoryData(categoryName);

    const categoryTitle = document.getElementById("categoryTitle");
    const categoryLabel = document.getElementById("categoryLabel");
    const categoryDescription = document.getElementById("categoryDescription");
    const peopleTitle = document.getElementById("peopleTitle");
    const peopleCount = document.getElementById("peopleCount");

    if (categoryTitle) categoryTitle.textContent = category.title || categoryName;
    if (categoryLabel) categoryLabel.textContent = category.label || "التخصصات";
    if (categoryDescription) categoryDescription.textContent = category.description || "اختاري الشخص المناسب لمشروعك";
    if (peopleTitle) peopleTitle.textContent = category.peopleTitle || "الأشخاص المتاحين";

    const peopleList = category.people || [];
    if (peopleCount) {
        peopleCount.textContent = peopleList.length > 0 
            ? `${peopleList.length} متاحين` 
            : "قريباً";
    }

    if (peopleList.length > 0) {
        engineersGrid.innerHTML = peopleList.map(person => {
            const waText = encodeURIComponent(`السلام عليكم ${person.name}، تواصلت معك من خلال منصة أهل الصنعة بخصوص خدمات: ${person.job}`);
            const waPhone = person.phone.replace(/^0/, "20");
            const waUrl = `https://wa.me/${waPhone}?text=${waText}`;

            return `
            <div class="engineer-card" data-id="${person.id || ''}">
                <div class="engineer-info">
                    <div class="engineer-avatar" aria-label="${person.name}">
    ${person.image
        ? `<img src="${person.image}" alt="${person.name}">`
        : person.initials}
</div>
                    <div class="engineer-bio">
                        <h3>${person.name}</h3>
                        <p>${person.job}</p>
                    </div>
                    <span class="available"><i class="fa-solid fa-circle" style="font-size: 8px; margin-left: 4px;"></i>متاح</span>
                </div>

                <div class="engineer-details">
                    <p>
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${person.location}</span>
                    </p>
                    <p>
                        <i class="fas fa-briefcase"></i>
                        <span>${person.experience}</span>
                    </p>
                    ${person.rating ? `
                    <p>
                        <i class="fas fa-star" style="color: #fbbf24;"></i>
                        <span>تقييم ${person.rating} / 5</span>
                    </p>` : ''}
                </div>

                <div class="engineer-actions">
                    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> واتساب
                    </a>
                    <button type="button" class="details-btn" onclick="openPersonDetails(${person.id})">التفاصيل</button>
                </div>
            </div>`;
        }).join("");
    } else {
        engineersGrid.innerHTML = `
            <div class="no-engineers" style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: var(--card-bg); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
                <i class="fa-solid fa-users-slash" style="font-size: 48px; color: var(--accent-gold); margin-bottom: 16px; opacity: 0.8;"></i>
                <h3 style="color: #fff; font-size: 20px; margin-bottom: 8px;">لا يوجد أشخاص مسجلون في هذا التخصص حاليًا</h3>
                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px; max-width: 450px; margin-left: auto; margin-right: auto;">
                    نعمل حاليًا على مراجعة واعتماد أوراق حرفيين ومهندسين في هذا التخصص. يمكنك تصفح باقي التخصصات المتاحة.
                </p>
                <a href="index.html#categories" class="btn-gold" style="padding: 10px 24px; font-size: 14px; text-decoration: none;">
                    تصفح باقي التخصصات
                </a>
            </div>
        `;
    }
}
// Dark & Light Mode
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

// تحميل الوضع المحفوظ
const savedTheme = localStorage.getItem('site-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

if (themeIcon) {
    themeIcon.className = savedTheme === 'dark'
        ? 'fa-solid fa-sun'
        : 'fa-solid fa-moon';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('site-theme', newTheme);

        themeIcon.className = newTheme === 'dark'
            ? 'fa-solid fa-sun'
            : 'fa-solid fa-moon';
    });
}
// تشغيل فور تحميل المستند أو مباشرة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategoryPage);
} else {
    initCategoryPage();
}

// 8. نافذة التفاصيل التفاعلية (Details Modal)
function openPersonDetails(personId) {
    let selectedPerson = null;
    for (const catKey in categories) {
        const found = (categories[catKey].people || []).find(p => p.id === personId);
        if (found) {
            selectedPerson = found;
            break;
        }
    }

    if (!selectedPerson) return;

    let modal = document.getElementById('detailsModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'detailsModal';
        modal.className = 'custom-modal';
        document.body.appendChild(modal);
    }

    const waText = encodeURIComponent(`السلام عليكم ${selectedPerson.name}، تواصلت معك من خلال منصة أهل الصنعة`);
    const waUrl = `https://wa.me/201000000000?text=${waText}`;
    const specsHtml = (selectedPerson.specialties || ['خدمات متكاملة', 'أعلى معايير الجودة', 'التزام تام بالمواعيد'])
        .map(s => `<li style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #d1d5db; margin-bottom: 6px;"><i class="fa-solid fa-check" style="color: var(--accent-gold);"></i> ${s}</li>`)
        .join('');

    modal.innerHTML = `
        <div class="custom-modal-backdrop" onclick="closePersonDetails()"></div>
        <div class="custom-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <button class="custom-modal-close" onclick="closePersonDetails()" aria-label="إغلاق">&times;</button>
            <div class="modal-header-content" style="text-align: center; margin-bottom: 16px;">
                <div class="engineer-avatar" style="width: 60px; height: 60px; font-size: 20px; margin: 0 auto 10px; border: 2px solid var(--accent-gold);">${selectedPerson.initials}</div>
                <h3 id="modalTitle" style="color: #fff; font-size: 20px; font-weight: 800; margin-bottom: 4px;">${selectedPerson.name}</h3>
                <p style="color: var(--accent-gold-light); font-size: 13.5px; font-weight: 600;">${selectedPerson.job}</p>
                <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(212,175,55,0.15); border: 1px solid var(--border-color); padding: 3px 12px; border-radius: 20px; font-size: 11.5px; color: var(--accent-gold); margin-top: 6px;">
                    <i class="fa-solid fa-shield-halved"></i> تم التحقق من الهوية والخبرة
                </div>
            </div>

            <div style="background: rgba(7, 25, 18, 0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 14px; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #d1d5db;">
                    <span><i class="fas fa-map-marker-alt" style="color: var(--accent-gold); margin-left: 6px;"></i> النطاق:</span>
                    <strong style="color: #fff;">${selectedPerson.location}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #d1d5db;">
                    <span><i class="fas fa-briefcase" style="color: var(--accent-gold); margin-left: 6px;"></i> سنوات الخبرة:</span>
                    <strong style="color: #fff;">${selectedPerson.experience}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; color: #d1d5db;">
                    <span><i class="fas fa-star" style="color: #fbbf24; margin-left: 6px;"></i> التقييم:</span>
                    <strong style="color: #fff;">★ ${selectedPerson.rating || '4.9'} / 5 (موثوق)</strong>
                </div>
            </div>

            <div style="margin-bottom: 18px;">
                <h4 style="color: #fff; font-size: 13.5px; font-weight: 700; margin-bottom: 8px;">أبرز الخدمات والمهام:</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${specsHtml}
                </ul>
            </div>

            <div style="display: flex; gap: 10px;">
                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn" style="flex: 1; padding: 11px; text-decoration: none; border-radius: 10px; font-weight: 700; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
                    <i class="fab fa-whatsapp"></i> تواصل عبر واتساب
                </a>
                <a href="tel:${selectedPerson.phone || '01000000000'}" class="details-btn" style="padding: 11px 16px; text-decoration: none; border-radius: 10px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                    <i class="fa-solid fa-phone"></i> اتصال
                </a>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePersonDetails() {
    const modal = document.getElementById('detailsModal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.body.style.overflow = '';
}

// إغلاق النافذة بزر Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePersonDetails();
    }
});
