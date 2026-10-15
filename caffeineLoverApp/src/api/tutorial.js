import { ENV } from "../utils";

async function getLatestTutorials(limit = 20) {
  try {
    const sortFilter = "sort=publishedAt:desc";
    const paginationFilter = `pagination[limit]=${limit}`;
    const populateFilter = "populate=*";
    const filters = `${sortFilter}&${paginationFilter}&${populateFilter}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.TUTORIALS}?${filters}`;
    // console.log("API URL1:", url);

    const response = await fetch(url);

    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    // console.error("Error in getLatestTutorials:", error);
    throw error;
  }
}

export const tutorialCtrl = {
  getLatest: getLatestTutorials,
};
