import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import api from "../utils/api";
import Alert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loading from "./Loading";
import "../App.css";
import Navbar from "./Navbar";
const useStyles = makeStyles({
  root: {
    maxWidth: 550,
  },
  table: {
    minWidth: 450,
  },
});

function PredictIntent() {
  const [formData, setFormData] = useState({
    Administrative: 0,
    Administrative_Duration: 0,
    Informational: 0,
    Informational_Duration: 0,
    ProductRelated: 0,
    ProductRelated_Duration: 0,
    BounceRates: 0,
    ExitRates: 0.0,
    PageValues: 0,
    SpecialDay: 0,
    Month: 0,
    OperatingSystems: 0,
    Region: 0,
    TrafficType: 0,
    VisitorType: 0,
  });

  const [predictionData, setPredictionData] = useState({});

  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleChange = (e) => {
    let newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  };

  const handleClick = async () => {
    setLoadingStatus(true);

    const request = new FormData();
    console.log(formData);
    for (let key in formData) {
      request.append(key, formData[key]);
    }

    const response = await api.post("/predict", request);

    const responseData = response.data;
    console.log(responseData);
    setPredictionData(responseData);
    setLoadingStatus(false);
  };

  const handleBackClick = () => {
    setPredictionData({});
  };

  const classes = useStyles();

  if (predictionData?.prediction_data) {
    const outputComponent = (
      <div className="output_container">
        <Card className={`${classes.root} output_container__card`}>
          {predictionData?.prediction_data ===
          "Customer will not make a purchase" ? (
            <CardMedia
              component="img"
              height="200"
              src="https://assets.entrepreneur.com/content/3x2/2000/20151125105751-questions-1014060-1920.jpeg?crop=1:1"
              alt="not purchased"
            />
          ) : (
            <CardMedia
              component="img"
              height="194"
              image="https://ownrblog.com/wp-content/uploads/2020/06/purchase-order-defintion.jpg"
              alt="not purchased"
            />
          )}

          <CardContent>
            <Typography gutterBottom align="center" variant="h5" component="h2">
              <b>Prediction for customer's intent </b>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            ></Typography>
            <br />

            <TableContainer align="center" component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell component="th" align="center">
                      <b>RandomForest Model Prediction</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      <Typography gutterBottom variant="h5" component="h2">
                        <b> {predictionData.prediction_data}</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions>
            <Button
              onClick={() => handleBackClick()}
              className="back__button"
              variant="contained"
              size="small"
              color="primary"
            >
              Back to Predict
            </Button>
          </CardActions>
        </Card>
      </div>
    );

    return outputComponent;
  } else if (loadingStatus) {
    return <Loading />;
  } else
    return (
      <>
        <Navbar />
        <div className="form">
          <div className="form__form_group">
            {predictionData.error && (
              <>
                <Alert
                  onClose={() => {}}
                  style={{ marginTop: "20px" }}
                  severity="error"
                >
                  {" "}
                  {predictionData.error}{" "}
                </Alert>
              </>
            )}

            <center>
              <div className="form__title">
                Customer Purchase Intent Prediction
              </div>
            </center>
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.Administrative}
              className="form__text_field"
              id="Administrative"
              name="Administrative"
              variant="filled"
              label="Administrative"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.Administrative_Duration}
              className="form__text_field"
              id="Administrative_Duration"
              name="Administrative_Duration"
              variant="filled"
              label="Administrative_Duration"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.Informational}
              className="form__text_field"
              id="Informational"
              name="Informational"
              variant="filled"
              label="Informational"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.Informational_Duration}
              className="form__text_field"
              id="Informational_Duration"
              name="Informational_Duration"
              variant="filled"
              label="Informational_Duration"
            />

            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.ProductRelated}
              className="form__text_field"
              id="ProductRelated"
              name="ProductRelated"
              variant="filled"
              label="ProductRelated"
            />

            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.ProductRelated_Duration}
              className="form__text_field"
              id="ProductRelated_Duration"
              name="ProductRelated_Duration"
              variant="filled"
              label="ProductRelated_Duration"
            />

            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.BounceRates}
              className="form__text_field"
              id="BounceRates"
              name="BounceRates"
              variant="filled"
              label="BounceRates(float)"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.ExitRates}
              className="form__text_field"
              id="ExitRates"
              name="ExitRates"
              variant="filled"
              label="ExitRates(float)"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.PageValues}
              className="form__text_field"
              id="PageValues"
              name="PageValues"
              variant="filled"
              label="PageValues (float)"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.SpecialDay}
              className="form__text_field"
              id="SpecialDay"
              name="SpecialDay"
              variant="filled"
              label="SpecialDay (float)"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.Month}
              className="form__text_field"
              id="Month"
              name="Month"
              variant="filled"
              label="Month in numbers starting from 0"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.OperatingSystems}
              className="form__text_field"
              id="OperatingSystems"
              name="OperatingSystems"
              variant="filled"
              label="OperatingSystems"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.Region}
              className="form__text_field"
              id="Region"
              name="Region"
              variant="filled"
              label="Region"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.TrafficType}
              className="form__text_field"
              id="TrafficType"
              name="TrafficType"
              variant="filled"
              label="TrafficType"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.VisitorType}
              className="form__text_field"
              id="VisitorType"
              name="VisitorType"
              variant="filled"
              label="Visitor type; 0, 1, or 2"
            />

            <Button
              onClick={() => handleClick()}
              className="form__button"
              color="primary"
              variant="contained"
            >
              Predict intent
            </Button>
          </div>
        </div>
      </>
    );
}

export default PredictIntent;
