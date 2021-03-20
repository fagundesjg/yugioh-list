import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

import "./styles.css";
import { ICard } from "../../services/yugioh/types";
import { YugiohServices } from "../../services";

const Home = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    YugiohServices.getAllCards(100, 0)
      .then((res) => {
        setCards(res.data);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }, []);

  return (
    <div className="container">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          container
          spacing={2}
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            <Typography variant="h3">{`Lista de cartas (${cards.length})`}</Typography>
          </Grid>

          {loading && (
            <Grid item>
              <CircularProgress size={15} color="secondary" />
            </Grid>
          )}
        </Grid>
        {!loading &&
          cards.map((c) => (
            <Grid
              key={c.id}
              container
              spacing={2}
              alignItems="flex-start"
              item
              xs={12}
              md={4}
              lg={2}
              wrap="nowrap"
            >
              <Grid item>
                <img
                  onClick={() =>
                    window.open("_blank", c.card_images[0].image_url)
                  }
                  src={c.card_images[0].image_url}
                  height="100"
                  width="auto"
                  alt={"image-" + c.name}
                />
              </Grid>
              <Grid item container direction="column">
                <Grid item>
                  <Typography color="primary" variant="subtitle1">
                    <b>{c.name}</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="secondary" variant="subtitle2">
                    {c.race}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption">{c.desc}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export { Home };
