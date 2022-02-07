export const useStyles = () => ({
    root: {
        width: '100%',
        borderRadius: '24px',
        backgroundColor: '#001E3C',
        padding: '16px',
        display: 'grid',
        boxShadow:"unset",
        gridTemplateColumns: '30% 1fr',
        columnGap: '16px',
        margin: '12px 0px',
        cursor: 'pointer'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto 8px',
    },
    media: {
        width: '180px',
        height: '180px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        borderRadius: '16px',
    },
    templateName: {
        marginBottom: '4px',
        color: 'rgb(255, 255, 255)',
        fontWeight: 'bold',
        fontSize: '15px',
        lineHeight: '20px',
    },
    templateDescription: {
        fontSize: '14px',
        lineHeight: '18px',
        color: 'rgb(224, 224, 224)',
        marginBottom: '12px',
    }
});