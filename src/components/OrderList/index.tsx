import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { IOrderListComponent } from "./interfaces";
import { BoxStyled } from "./styles";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { sendDeleteRequest, sendEditRequest } from "../../axios/hooks";
import { Link } from "react-router-dom";

export const OrderList: FC<IOrderListComponent> = ({ orders, setOrders }) => {
  const [isOrderDone, setIsOrderDone] = useState(
    orders.map((elem) => {
      if (elem.status === 0) return 0;
      else return 2;
    })
  );
  const handleDeleteClick = async (id: string) => {
    await sendDeleteRequest(id);
    const newOrders = orders.filter((order) => order.id !== id);
    setOrders(newOrders);
  };

  const handleDoneClick = async (id: string, index: number) => {
    const doneElem = orders.find((elem) => elem.id === id);
    if (doneElem) {
      doneElem!.status = 2;
      const newIsOrderDone = [...isOrderDone];
      newIsOrderDone[index] = 2;
      setIsOrderDone(newIsOrderDone);
      await sendEditRequest("order/Edit", doneElem);
    }
  };

  return (
    <BoxStyled className="OrdersBox">
      <Button component={Link} to="create-order/:id">
        создать заказ
      </Button>
      <List>
        {orders.length === 0 ? (
          <Typography align={"center"} mt={4} sx={{ color: "lightgray" }}>
            нет созданных заказов
          </Typography>
        ) : (
          orders.map((elem, index) => (
            <ListItem key={elem.id} disableGutters>
              <ListItemText
                primary={`${elem.topic}\n ${elem.price}₽`}
                secondary={<>{`${elem.description}`}</>}
              />
              <IconButton
                aria-label="comments"
                onClick={() => {
                  handleDoneClick(elem.id, index);
                }}
              >
                {isOrderDone[index] === 0 ? (
                  <CheckIcon />
                ) : (
                  <CheckCircleOutlineIcon />
                )}
              </IconButton>
              <IconButton
                aria-label="comments"
                component={Link}
                to={`create-order/${elem.id}`}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="comments"
                onClick={() => {
                  handleDeleteClick(elem.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        )}
      </List>
    </BoxStyled>
  );
};
