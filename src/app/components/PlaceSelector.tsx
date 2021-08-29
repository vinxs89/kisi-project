import { Box, Grid } from "@material-ui/core"
import { useState } from "react";
import { useStyles } from "../Styles";
import { Place, PlacePagination } from "../Types"

type PlaceSelectorProps = {
    placePagination: PlacePagination;
    selectedPlace: Place | null;
    handleSelectedPlace: Function;
}

export const PlaceSelector = ({ placePagination, selectedPlace, handleSelectedPlace }: PlaceSelectorProps) => {
    const classes = useStyles();
    const handleChange = (place: Place) => {
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