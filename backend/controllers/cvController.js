const CV = require("../models/CV");

// ================= CREATE CV =================
const createCV = async (req, res) => {
  try {
    const cvData = req.body;

    if (!cvData.name || !cvData.name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const cv = await CV.create({
      ...cvData,
      userId: req.userId,
    });

    res.status(201).json({
      message: "CV created successfully",
      cv,
    });
  } catch (error) {
    console.error("Create CV error:", error);

    res.status(500).json({
      message: "Server error while creating CV",
    });
  }
};

// ================= GET ALL USER CVS =================
const getMyCVs = async (req, res) => {
  try {
    const cvs = await CV.find({
      userId: req.userId,
    }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      cvs,
    });
  } catch (error) {
    console.error("Get CVs error:", error);

    res.status(500).json({
      message: "Server error while fetching CVs",
    });
  }
};

// ================= GET SINGLE CV =================
const getCV = async (req, res) => {
  try {
    const cv = await CV.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!cv) {
      return res.status(404).json({
        message: "CV not found",
      });
    }

    res.status(200).json({
      cv,
    });
  } catch (error) {
    console.error("Get CV error:", error);

    res.status(500).json({
      message: "Server error while fetching CV",
    });
  }
};

// ================= UPDATE CV =================
const updateCV = async (req, res) => {
  try {
    const cvData = req.body;

    if (!cvData.name || !cvData.name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const cv = await CV.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      {
        $set: {
          ...cvData,
          userId: req.userId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!cv) {
      return res.status(404).json({
        message: "CV not found",
      });
    }

    res.status(200).json({
      message: "CV updated successfully",
      cv,
    });
  } catch (error) {
    console.error("Update CV error:", error);

    res.status(500).json({
      message: "Server error while updating CV",
    });
  }
};

// ================= DELETE CV =================
const deleteCV = async (req, res) => {
  try {
    const cv = await CV.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!cv) {
      return res.status(404).json({
        message: "CV not found",
      });
    }

    res.status(200).json({
      message: "CV deleted successfully",
    });
  } catch (error) {
    console.error("Delete CV error:", error);

    res.status(500).json({
      message: "Server error while deleting CV",
    });
  }
};

module.exports = {
  createCV,
  getMyCVs,
  getCV,
  updateCV,
  deleteCV,
};