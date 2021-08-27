import { Box, Container, Grid } from "@material-ui/core"
import { useState } from "react";
import { Place, PlacePagination } from "../Types"

type PlaceSelectorProps = {
    placePagination: PlacePagination | null;
    handleSelectedPlace: Function;
}

export const PlaceSelector = ({ placePagination, handleSelectedPlace }: PlaceSelectorProps) => {
    const [selectedPlace, updateSelectedPlace] = useState(null as unknown as Place);
    const handleChange = (place: Place) => {
        updateSelectedPlace(place);
        handleSelectedPlace(place);
    };

    let content;
    if (placePagination === null) {
        content = <p>Loading...</p>
    } else if (placePagination.pagination.count === 0) {
        content = <p>No places created</p>
    } else {
        content = (
            <Grid container>
                {
                    placePagination.data.map(place => (
                        <Grid item xs={6} md={4} key={place.id}>
                            <Box style={{cursor: 'pointer'}} padding="10px" textAlign="center" border='1px solid' borderColor={selectedPlace === place ? 'black' : '#ccc'} onClick={() => handleChange(place)}>
                                { place.name }
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
        )
    }

    return (
        <Container>{content}</Container>
    )
}