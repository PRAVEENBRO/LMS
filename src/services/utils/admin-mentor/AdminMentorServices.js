import serviceUtil from "../../index";

const adminMentorGetAll = () => {
  return serviceUtil
    .get("lmsuser/mentorslist")
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

const adminMentorSubmit = (payload) => {
  return serviceUtil
    .post("lmsuser/mentorregister", payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

const adminMentorDelete = (payload) => {
  console.log(payload, "payload");
  return serviceUtil
    .deleteAll(`lms/v1/admin/mentor/${payload}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response.data;
      return { errRes };
    });
};

export { adminMentorGetAll, adminMentorSubmit, adminMentorDelete };
