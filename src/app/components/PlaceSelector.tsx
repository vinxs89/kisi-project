import { Box, Grid } from "@material-ui/core"
import { useState } from "react";
import { useStyles } from "../Styles";
import { Place, PlacePagination } from "../Types"

type PlaceSelectorProps = {
    placePagination: PlacePagination;
    handleSelectedPlace: Function;
}

export const PlaceSelector = ({ placePagination, handleSelectedPlace }: PlaceSelectorProps) => {
    const classes = useStyles();
    const [selectedPlace, updateSelectedPlace] = useState(null as unknown as Place);
    const handleChange = (place: Place) => {
        updateSelectedPlace(place);
        handleSelectedPlace(place);
    };

    return (
        <Grid container>
            {
                placePagination.data.map(place => (
                    <Grid item xs={6} md={4} key={place.id}>
                        <Box className={[classes.placeSelector__place, selectedPlace === place ? classes.placeSelector__selectedPlace : ''].join(' ')} onClick={() => handleChange(place)}>
                            { place.name }
                        </Box>
                    </Grid>
                ))
            }
        </Grid>
    )
}