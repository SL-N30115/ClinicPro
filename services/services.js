import axios from "axios";

const hostingAddress = "https://gp5.onrender.com";

export const postNewPatient = async (patient) => {
  patient.id = getRandomNumber(13);
  patient.bedNumber = "a380";
  patient.photoUrl = await getPatientImage(patient.gender);
  //patient.photoUrl = getPatientImage(patient.gender);
  var test = JSON.stringify(patient);

  try {
    const res = await axios.post(`${hostingAddress}/patients`, test, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const patchPatientInfo = async (payload, patient) => {
  payload.id = patient.id;
  var json = JSON.stringify(payload);
  try {
    const res = await axios.patch(`${hostingAddress}/patients`, json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const patchPatientLatestRecord = async (patient, testId, category) => {
  const latestRecord = {
    id: patient.id,
    latestRecord: {
      ...patient.latestRecord,
      [category]: testId,
    },
  };
  var json = JSON.stringify(latestRecord);
  try {
    const res = await axios.patch(`${hostingAddress}/patients`, json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getPatientImage = async (gender) => {
  var imageUri = "";
  try {
    await axios
      .get(`https://randomuser.me/api/?gender=${gender}`)
      .then((res) => {
        imageUri = JSON.stringify(res.data.results[0].picture.large);
      });
    imageUri = imageUri.replace(/[&\\\#, +()$~%'"*?<>{}]/g, "");
    return imageUri;
  } catch (err) {
    console.log(err);
  }
};

export const postNewPatientTest = async (patientTest) => {
  patientTest.modifyDate = new Date();
  var test = JSON.stringify(patientTest);
  try {
    const res = await axios.post(
      `${hostingAddress}/patients/:${patientTest.id}/tests`,
      test,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const patchPatientTest = async (patientTest) => {
  patientTest.modifyDate = new Date();
  var test = JSON.stringify(patientTest);
  try {
    const res = await axios.patch(
      `${hostingAddress}/patients/${patientTest.patientId}/tests/${patientTest.id}`,
      test,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const getPatientTestReadingById = async (patient, testId) => {
  try {
    var test = "";
    await axios
      .get(`${hostingAddress}/patients/${patient.id}/tests/${testId}`)
      .then((res) => {
        test = JSON.stringify(res.data.data.readings);
      });
    return test;
  } catch (err) {
    return "No record";
  }
};

export const deletePatientTest = async (patientTest) => {
  try {
    const res = await axios.delete(
      `${hostingAddress}/patients/${patientTest.patientId}/tests/${patientTest.id}`
    );
    return res;
  } catch (err) {
    return err;
  }
};

const getRandomNumber = (digit) => {
  return Math.random().toFixed(digit).split(".")[1];
};
