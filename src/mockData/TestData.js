export const userRoom = {
    hostName: 'Test',
    roomID: 'Test_0',
    images:[
        {
            src: 'https://media.sketchfab.com/models/9363665ee7b94a16b6aba18a89d70be9/thumbnails/b5c7bc7d6dfe496fac3463b45e535ef8/b4b17aa65e68425ab4aea8db1f136202.jpeg'
        },
        {
            src: 'https://media.istockphoto.com/vectors/pixel-art-cyberpunk-metropolis-background-vector-id1279840008?k=20&m=1279840008&s=612x612&w=0&h=M_E3GNssqAkdszL4-1TIsPohgnIJbhyqWShC5wuU7Tw='
        },
        {
            src: 'https://mocah.org/uploads/posts/923896-pixel-art-town-city-waneella.jpg'
        }
    ],
    description: 'Test'
};

export const templates = [
    {
        id: 1,
        type: 'Office',
        templateRooms: [
            {
                tid:1,
                name:'Office 1',
                src:'https://i.pinimg.com/originals/e0/8d/cd/e08dcd4401a0015a31b593738031f5b0.png',
                des:'Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.',
                min: 1,
                max: 25,
                tags: [
                    {
                        tag: 'Executive offices',
                    },
                    {
                        tag: 'Meeting spaces',
                    },
                    {
                        tag: 'Home sofa',
                    },
                ]
            },
            {
                tid:2,
                name:'Office 2',
                src:'https://media.sketchfab.com/models/9363665ee7b94a16b6aba18a89d70be9/thumbnails/b5c7bc7d6dfe496fac3463b45e535ef8/b4b17aa65e68425ab4aea8db1f136202.jpeg',
                des:'Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.',
                min: 1,
                max: 25,
                tags: [
                    {
                        tag: 'Park',
                    },
                    {
                        tag: 'Firework',
                    }
                ]
            }
        ]
    },
    {
        id: '1',
        type: 'Seasonal',
        templateRooms: [
            {
                tid:3,
                name:'Seasonal 1',
                src:'https://dienthoaivui.com.vn/wp-content/uploads/2020/10/hinh-nen-iphone-12-19-scaled.jpg',
                des:'Good for large people',
                min: 1,
                max: 50,
                tags: [
                    {
                        tag: 'Alot of trees',
                    },
                    {
                        tag: 'Meeting spaces',
                    },
                    {
                        tag: 'Street',
                    },
                ]
            },
            {
                tid:4,
                name:'Seasonal 2',
                src:'https://1.bp.blogspot.com/-EhWw8jF-c3I/XU-pn4RGGYI/AAAAAAAAA-U/3DIjFAXcu4kBWSg2GduhCe1Ym_A-AdFCgCLcBGAs/s1600/Kotizon-bo-suu-tap-hinh-nen-danh-cho-laptop-cuc-net-full-hd-1.jpg',
                des:'Something need to be done together',
                min: 1,
                max: 50,
                tags: [
                    {
                        tag: 'Executive offices',
                    },
                    {
                        tag: 'Meeting spaces',
                    },
                    {
                        tag: 'Home sofa',
                    },
                ]
            }
        ]
    },
    {
        id: '2',
        type: 'Experience'
    },
    {
        id: '3',
        type: 'Social'
    },
    {
        id: '4',
        type: 'Conference'
    },
    {
        id: '5',
        type: 'Education'
    },
    {
        id: '6',
        type: 'Wibu'
    },
    {
        id: '7',
        type: 'Blank'
    }
];