export const PRAYERS = {
    sinalDaCruz: {
        title: "Sinal da Cruz",
        text: "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
    },
    oferecimento: {
        title: "Oferecimento",
        text: "Divino Jesus, nós Vos oferecemos este Terço que vamos rezar, meditando nos mistérios da Vossa Redenção. Concedei-nos, por intercessão da Virgem Maria, Mãe de Deus e nossa Mãe, as virtudes que nos são necessárias para bem rezá-lo e a graça de ganharmos as indulgências desta santa devoção.",
    },
    creio: {
        title: "Creio",
        text: "Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai Todo-Poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
    },
    paiNosso: {
        title: "Pai Nosso",
        text: "Pai Nosso que estais nos céus, santificado seja o Vosso nome, venha a nós o Vosso reino, seja feita a Vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
    },
    aveMaria: {
        title: "Ave Maria",
        text: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.",
    },
    gloria: {
        title: "Glória",
        text: "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.",
    },
    jaculatoria: {
        title: "Jaculatória",
        text: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem.",
    },
    salveRainha: {
        title: "Salve Rainha",
        text: "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo.",
    },
};

export const MYSTERIES_BY_DAY = {
    Domingo: "Gloriosos",
    Segunda: "Gozosos",
    Terça: "Dolorosos",
    Quarta: "Gloriosos",
    Quinta: "Luminosos",
    Sexta: "Dolorosos",
    Sábado: "Gozosos",
};

// Detalhamento com Imagens de Arte Sacra (URLs estáveis da Wikimedia/WGA)
export const DETAILED_MYSTERIES = {
    Gozosos: [
        {
            label: "A Anunciação do Anjo a Maria",
            image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Fra_Angelico_-_Annunciation_-_WGA00438.jpg",
        },
        {
            label: "A Visitação de Maria a sua prima Isabel",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Mariotto_Albertinelli_001.jpg",
        },
        {
            label: "O Nascimento de Jesus em Belém",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Gerard_van_Honthorst_-_Adoration_of_the_Shepherds_%281622%29.jpg",
        },
        {
            label: "A Apresentação de Jesus no Templo",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Presentation_of_Jesus_at_the_Temple_-_Mantegna.jpg",
        },
        {
            label: "A Perda e o Encontro de Jesus no Templo",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Jesus_among_the_doctors_ingres.jpg",
        },
    ],
    Dolorosos: [
        {
            label: "A Agonia de Jesus no Horto das Oliveiras",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Giovanni_Bellini_-_Agony_in_the_Garden_-_WGA01633.jpg/1280px-Giovanni_Bellini_-_Agony_in_the_Garden_-_WGA01633.jpg",
        },
        {
            label: "A Flagelação de Jesus",
            image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Caravaggio_-_La_Flagellazione_di_Cristo.jpg",
        },
        {
            label: "A Coroação de Espinhos",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Ecce_Homo_by_Guido_Reni_%28Louvre%29.jpg",
        },
        {
            label: "Jesus carrega a Cruz até o Calvário",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/73/El_Greco_-_Christ_Carrying_the_Cross_%281580%29.jpg",
        },
        {
            label: "A Crucificação e Morte de Jesus",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Vel%C3%A1zquez_-_Cristo_crucificado_%28Museo_del_Prado%2C_c._1632%29.jpg",
        },
    ],
    Gloriosos: [
        {
            label: "A Ressurreição de Jesus",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Piero_della_Francesca_046.jpg",
        },
        {
            label: "A Ascensão de Jesus ao Céu",
            image: "https://upload.wikimedia.org/wikipedia/commons/1/13/Garofalo_-_Ascension_of_Christ_-_WGA08470.jpg",
        },
        {
            label: "A Vinda do Espírito Santo sobre os Apóstolos",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Pentecostes_%28El_Greco%29.jpg",
        },
        {
            label: "A Assunção de Maria ao Céu",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Tizian_041.jpg",
        },
        {
            label: "A Coroação de Maria",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Diego_Vel%C3%A1zquez_-_Coronation_of_the_Virgin_-_WGA24473.jpg",
        },
    ],
    Luminosos: [
        {
            label: "O Batismo de Jesus no Jordão",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Piero_della_Francesca_044.jpg",
        },
        {
            label: "O Milagre nas Bodas de Caná",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Paolo_Veronese_008.jpg",
        },
        {
            label: "O Anúncio do Reino de Deus",
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Sermon_on_the_Mount_Carl_Bloch.jpg",
        },
        {
            label: "A Transfiguração de Jesus",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/94/Transfiguration_Raphael.jpg",
        },
        {
            label: "A Instituição da Eucaristia",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/61/Leonardo_da_Vinci_-_The_Last_Supper_high_res.jpg",
        },
    ],
};