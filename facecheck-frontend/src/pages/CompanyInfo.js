import React, { useState } from "react";
import {
  Autocomplete,
  Chip,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const CompanyInfo = ({
  isCompanyEditing,
  setIsCompanyEditing,
  handleCompanyEditClick,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const positionOptions = ["사원", "대리", "과장", "차장", "부장", "임원"];
  const departmentOptions = ["영업", "개발", "인사", "재무", "마케팅", "기타"];

  const handleCompanyInputChange = (value) => {
    setCompanyName(value);
  };

  const handlePositionChange = (positions) => {
    setSelectedPositions(positions);
  };

  const handleDepartmentChange = (departments) => {
    setSelectedDepartments(departments);
  };

  const handleSaveCompanyClick = () => {
    setIsCompanyEditing(false);
  };

  const handleCancelCompanyClick = () => {
    setIsCompanyEditing(false);
  };

  const getChipColor = (positionOrDepartment) => {
    switch (positionOrDepartment) {
      case "사원":
        return "#FFC3A0";
      case "대리":
        return "#A0FFC3";
      case "과장":
        return "#C3A0FF";
      case "영업":
        return "#FFD68F";
      case "개발":
        return "#80C45A";
      case "인사":
        return "#FFEC8B";
      case "재무":
        return "#A4CAFF";
      case "마케팅":
        return "#FF9EFF";
      case "기타":
        return "#BEBEBE";
      default:
        return "#333333";
    }
  };

  return (
    <>
      <TextField
        id="companyName"
        label="companyName"
        variant="standard"
        margin="normal"
        fullWidth
        disabled={!isCompanyEditing}
        value={companyName}
        onChange={(e) => handleCompanyInputChange(e.target.value)}
      />
      <div style={{ marginBottom: "16px", width: "100%" }}>
        {isCompanyEditing ? (
          <Autocomplete
            multiple
            id="position"
            options={positionOptions}
            value={selectedPositions}
            onChange={(_, newValue) => handlePositionChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Position"
                fullWidth
                sx={{ width: "100%" }}
              />
            )}
          />
        ) : (
          <>
            {selectedPositions.length === 0 ? (
              <Typography
                variant="body2"
                style={{
                  marginBottom: "8px",
                  color: "gray",
                }}
              >
                No positions selected
              </Typography>
            ) : (
              <>
                <Typography
                  variant="body2"
                  style={{
                    marginBottom: "8px",
                    color: "gray",
                  }}
                >
                  companyPosition
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {selectedPositions.map((position, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "4px",
                      }}
                    >
                      <Chip
                        label={position}
                        sx={{
                          marginLeft: "4px",
                          color: "white",
                          backgroundColor: getChipColor(position),
                        }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div style={{ marginBottom: "16px", width: "100%" }}>
        {isCompanyEditing ? (
          <Autocomplete
            multiple
            id="department"
            options={departmentOptions}
            value={selectedDepartments}
            onChange={(_, newValue) => handleDepartmentChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Department"
                fullWidth
                sx={{ width: "100%" }}
              />
            )}
          />
        ) : (
          <>
            {selectedDepartments.length === 0 ? (
              <Typography
                variant="body2"
                style={{
                  marginBottom: "8px",
                  color: "gray",
                }}
              >
                No Departments selected
              </Typography>
            ) : (
              <>
                <Typography
                  variant="body2"
                  style={{
                    marginBottom: "8px",
                    color: "gray",
                  }}
                >
                  companyDepartment
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {selectedDepartments.map((department, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "4px",
                      }}
                    >
                      <Chip
                        label={department}
                        sx={{
                          marginLeft: "4px",
                          color: "white",
                          backgroundColor: getChipColor(department),
                        }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: isCompanyEditing ? "center" : "space-between",
          alignItems: "center",
          gap: "8px",
          marginTop: "16px",
          width: "100%",
        }}
      >
        {isCompanyEditing ? (
          <>
            <Button
              variant="contained"
              onClick={handleSaveCompanyClick}
              sx={{
                fontFamily: "Kalnia",
                backgroundColor: "#9FB9DE",
                "&:hover": {
                  backgroundColor: "#7487A7",
                },
              }}
            >
              Save Company
            </Button>
            <Button variant="outlined" onClick={handleCancelCompanyClick}>
              Cancel Company
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={handleCompanyEditClick}
            sx={{
              fontFamily: "Kalnia",
              backgroundColor: "#9FB9DE",
              "&:hover": {
                backgroundColor: "#7487A7",
              },
            }}
          >
            Edit Company
          </Button>
        )}
      </div>
    </>
  );
};

export default CompanyInfo;
