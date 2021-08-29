import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    section__title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    section__content: {
        marginTop: '20px'
    },
    placeSelector__place: {
        cursor: 'pointer',
        padding: '10px',
        textAlign: 'center',
        border: '1px solid #ccc',
    },
    placeSelector__selectedPlace: {
        borderColor: '#000',
    },
    histogram: {
        border: "1px solid #ccc",
        padding: "10px",
    },
    histogram__top: {
        display: "flex",
        height: "150px",
        borderBottom: '1px solid #ccc',
        paddingBottom: '5px'
    },
    histogram__bottom: {
        marginLeft: '40px',
        display: 'flex',
        marginTop: '30px',
        marginBottom: '20px',
        justifyContent: 'space-between'
    },
    histogram__legendY: {
        display: "flex",
        flexDirection: "column",
        marginTop: "auto",
        marginRight: "20px",
        height: "100%",
        justifyContent: "space-between"
    },
    histogram__barWrapper: {
        display:"flex",
        flexDirection:"column",
        marginTop:"auto",
        width:"100%"
    },
    histogram__dateChip: {
        transform: "rotate(45deg)"
    }
});