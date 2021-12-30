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
        id: '0',
        type: 'Office',
        templateRooms: [
            {
                tid:'1',
                name:'Office 1',
                src:'https://i.pinimg.com/originals/e0/8d/cd/e08dcd4401a0015a31b593738031f5b0.png',
                des:'Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.',
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
            },
            {
                tid:'2',
                name:'Office 2',
                src:'https://media.sketchfab.com/models/9363665ee7b94a16b6aba18a89d70be9/thumbnails/b5c7bc7d6dfe496fac3463b45e535ef8/b4b17aa65e68425ab4aea8db1f136202.jpeg',
                des:'Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.',
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
            },
            {
                tid:'3',
                name:'Office 3',
                src:'https://i.pinimg.com/originals/a3/e3/53/a3e353ce86e9f24a22d40508c9758257.jpg',
                des:'Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.',
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
        id: '1',
        type: 'Seasonal'
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
    },
];