import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { IOrder } from "../../axios/interfaces";
import { IOrderCreationComponent } from "./interfaces";
import { v4 as uuid } from "uuid";
import { sendPostRequest, sendEditRequest } from "../../axios/hooks";
import { Link, Navigate, useParams } from "react-router-dom";

export const OrderCreation: FC<IOrderCreationComponent> = ({
  orders,
  setOrders,
}) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    if (id !== ":id") {
      const editElement = orders.find((element) => element.id === id);

      if (editElement) {
        setTopic(editElement?.topic || "");
        setDescription(editElement?.description || "");
        setPrice(editElement.price.toString());
      }
    }
  }, [id, orders]);

  const handleChangeTopic = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTopic(event.target.value);
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleChangePrice = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPrice(event.target.value);
  };

  const handleSaveClick = async () => {
    const body: IOrder = {
      id: id === ":id" || id === undefined ? uuid() : id,
      topic: topic,
      status: 0,
      description: description,
      price: parseInt(price),
      idExecuter: "00000000-0000-0000-0000-000000000000",
      idCustomer: "3b62472e-4f66-49fa-a20f-e7685b9565d8",
    };
    if (id !== ":id") {
      await sendEditRequest("order/Edit", body);
      const newOrders = orders.filter((elem) => elem.id !== id);
      setOrders([...newOrders, body]);
    } else {
      await sendPostRequest("order/Save", body);
      setOrders([...orders, body]);
    }
    setTopic("");
    setDescription("");
    setRedirect(true);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <TextField
          id="outlined-multiline-flexible"
          label="название"
          fullWidth
          value={topic}
          onChange={handleChangeTopic}
          sx={{ width: 400 }}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-multiline-flexible"
          label="цена"
          type={"number"}
          value={price}
          onChange={handleChangePrice}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">&#8381;</InputAdornment>
            ),
          }}
          sx={{ alignSelf: "start" }}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-multiline-flexible"
          label="описание"
          multiline
          rows={4}
          value={description}
          onChange={handleChangeDescription}
          sx={{ width: 400 }}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleSaveClick}
          disabled={topic.length === 0 || description.length === 0}
        >
          сохранить
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/" variant="contained">
          назад
        </Button>
      </Grid>
      {redirect ? <Navigate to="/" /> : null}
    </Grid>
  );
};
