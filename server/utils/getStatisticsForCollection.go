package utils

import (
	"github.com/ZakharVD/finlio/database"
	"github.com/ZakharVD/finlio/models"
)

func GetStatisticsForCollection(userID, collectionId string) (Statistics, error) {
	type Response struct {
		Total          int
		Housing        int
		Food           int
		Transportation int
		Health         int
		Entertainment  int
		Education      int
		Debt           int
		Other          int
	}

	var statistics Response

	// Retrieve statistics data
	if res := database.DB.Model(&models.Expense{}).Select("SUM(CAST(amount AS INTEGER)) as Total").Where("user_id = ?", userID).Scan(&statistics); res.Error != nil {
		return Statistics{}, res.Error
	}

	if statistics.Total > 0 {
		if res := database.DB.Model(&models.Expense{}).Select("SUM(CAST(amount AS INTEGER)) as Total, "+
			"SUM(CASE WHEN label = 'Housing' THEN CAST(amount AS INTEGER) ELSE 0 END) as Housing, "+
			"SUM(CASE WHEN label = 'Food' THEN CAST(amount AS INTEGER) ELSE 0 END) as Food, "+
			"SUM(CASE WHEN label = 'Transportation' THEN CAST(amount AS INTEGER) ELSE 0 END) as Transportation, "+
			"SUM(CASE WHEN label = 'Health' THEN CAST(amount AS INTEGER) ELSE 0 END) as Health, "+
			"SUM(CASE WHEN label = 'Entertainment' THEN CAST(amount AS INTEGER) ELSE 0 END) as Entertainment, "+
			"SUM(CASE WHEN label = 'Education' THEN CAST(amount AS INTEGER) ELSE 0 END) as Education, "+
			"SUM(CASE WHEN label = 'Debt' THEN CAST(amount AS INTEGER) ELSE 0 END) as Debt, "+
			"SUM(CASE WHEN label = 'Other' THEN CAST(amount AS INTEGER) ELSE 0 END) as Other").
			Where("user_id = ? AND collection_id = ?", userID, collectionId).Scan(&statistics); res.Error != nil {
			return Statistics{}, res.Error
		}
	} else {
		return Statistics{}, nil
	}

	housingPerc := float64(statistics.Housing) / float64(statistics.Total)
	foodPerc := float64(statistics.Food) / float64(statistics.Total)
	transportationPerc := float64(statistics.Transportation) / float64(statistics.Total)
	healthPerc := float64(statistics.Health) / float64(statistics.Total)
	entertainmentPerc := float64(statistics.Entertainment) / float64(statistics.Total)
	educationtPerc := float64(statistics.Education) / float64(statistics.Total)
	debtPerc := float64(statistics.Debt) / float64(statistics.Total)
	otherPerc := float64(statistics.Other) / float64(statistics.Total)

	responseData := Statistics{
		Housing:        housingPerc,
		Food:           foodPerc,
		Transportation: transportationPerc,
		Health:         healthPerc,
		Entertainment:  entertainmentPerc,
		Education:      educationtPerc,
		Debt:           debtPerc,
		Other:          otherPerc,
	}

	return responseData, nil
}
