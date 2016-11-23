-- Database: edusysdb

-- DROP DATABASE edusysdb;

CREATE DATABASE edusysdb
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_US.UTF-8'
       LC_CTYPE = 'en_US.UTF-8'
       CONNECTION LIMIT = -1;
GRANT CONNECT, TEMPORARY ON DATABASE edusysdb TO public;
GRANT ALL ON DATABASE edusysdb TO postgres;
GRANT ALL ON DATABASE edusysdb TO dominozor;


-- TABLES --

-- Table: "EduUser"

-- DROP TABLE "EduUser";

CREATE TABLE "User"
(
  id character varying(8) NOT NULL, -- ID of user
  name character varying(50) NOT NULL, -- Name of the user.
  surname character varying(50) NOT NULL, -- Surname of the user.
  password character varying(30) NOT NULL,
  train_folder_link character varying(100), -- Url for the local folder that contains the data for face recognition training.
  profile_pic_link character varying(100),
  email character varying(20),
  user_role integer NOT NULL, -- 0->student...
  CONSTRAINT "User_pkey" PRIMARY KEY (id),
  CONSTRAINT "User_train_folder_link_email_profile_pic_link_key" UNIQUE (train_folder_link, email, profile_pic_link)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "User"
  OWNER TO dominozor;
COMMENT ON TABLE "User"
  IS 'Information about users.';
COMMENT ON COLUMN "User".id IS 'ID of user';
COMMENT ON COLUMN "User".name IS 'Name of the user.';
COMMENT ON COLUMN "User".surname IS 'Surname of the user.';
COMMENT ON COLUMN "User".train_folder_link IS 'Url for the local folder that contains the data for face recognition training.';
COMMENT ON COLUMN "User".user_role IS '0->student
1->lecturer
2->admin';

-- Table: "Course"

-- DROP TABLE "Course";

CREATE TABLE "Course"
(
  id character varying(20) NOT NULL,
  name character varying(100) NOT NULL,
  CONSTRAINT "Course_pkey" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Course"
  OWNER TO dominozor;

-- Table: "Section"

-- DROP TABLE "Section";

CREATE TABLE "Section"
(
  "userID" character varying(50) NOT NULL, -- userID of Lecturer
  "courseID" character varying(50) NOT NULL,
  "sectionNo" integer NOT NULL,
  number_of_students integer NOT NULL,
  number_of_lectures integer NOT NULL,
  CONSTRAINT "Section_pkey" PRIMARY KEY ("courseID", "sectionNo"),
  CONSTRAINT "Section_courseID_fkey" FOREIGN KEY ("courseID")
      REFERENCES "Course" (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "Section_userID_fkey" FOREIGN KEY ("userID")
      REFERENCES "User" (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Section"
  OWNER TO dominozor;
COMMENT ON COLUMN "Section"."userID" IS 'userID of Lecturer';


-- Table: "SectionStudentList"

-- DROP TABLE "SectionStudentList";

CREATE TABLE "SectionStudentList"
(
  course_id character varying(20) NOT NULL,
  section_no integer NOT NULL,
  "userID" character varying(8) NOT NULL,
  CONSTRAINT "SectionStudentList_pkey" PRIMARY KEY (course_id, section_no, "userID"),
  CONSTRAINT "SectionStudentList_course_id_fkey" FOREIGN KEY (course_id, section_no)
      REFERENCES "Section" ("courseID", "sectionNo") MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "SectionStudentList_userID_fkey" FOREIGN KEY ("userID")
      REFERENCES "User" (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "SectionStudentList"
  OWNER TO dominozor;

-- Table: "Attendance"

-- DROP TABLE "Attendance";

CREATE TABLE "Attendance"
(
  att_id character varying(20) NOT NULL,
  section_no integer NOT NULL,
  course_id character varying(20) NOT NULL,
  att_date timestamp without time zone NOT NULL,
  CONSTRAINT "Attendance_pkey" PRIMARY KEY (att_id),
  CONSTRAINT "Attendance_section_no_fkey" FOREIGN KEY (section_no, course_id)
      REFERENCES "Section" ("sectionNo", "courseID") MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Attendance"
  OWNER TO dominozor;
COMMENT ON TABLE "Attendance"
  IS 'Information about a regular attendance';

-- Table: "AttendanceList"

-- DROP TABLE "AttendanceList";

CREATE TABLE "AttendanceList"
(
  att_id character varying(20) NOT NULL,
  "userID" character varying(8) NOT NULL,
  CONSTRAINT "AttendanceList_pkey" PRIMARY KEY (att_id, "userID"),
  CONSTRAINT "AttendanceList_att_id_fkey" FOREIGN KEY (att_id)
      REFERENCES "Attendance" (att_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "AttendanceList_userID_fkey" FOREIGN KEY ("userID")
      REFERENCES "User" (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "AttendanceList"
  OWNER TO dominozor;


-- Table: "Exam"

-- DROP TABLE "Exam";

CREATE TABLE "Exam"
(
  course_id character varying(20) NOT NULL,
  section_no integer NOT NULL,
  type character varying(50) NOT NULL, -- Lab exam, Midterm, Final etc.
  average double precision,
  exam_id character varying(20) NOT NULL,
  CONSTRAINT "Exam_pkey" PRIMARY KEY (exam_id),
  CONSTRAINT "Exam_course_id_fkey" FOREIGN KEY (course_id, section_no)
      REFERENCES "Section" ("courseID", "sectionNo") MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "Exam_exam_id_fkey" FOREIGN KEY (exam_id)
      REFERENCES "Exam" (exam_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Exam"
  OWNER TO dominozor;
COMMENT ON COLUMN "Exam".type IS 'Lab exam, Midterm, Final etc.';

-- Table: "StudentGrade"

-- DROP TABLE "StudentGrade";

CREATE TABLE "StudentGrade"
(
  "userID" character varying(8) NOT NULL,
  exam_id character varying(20) NOT NULL,
  grade double precision NOT NULL,
  CONSTRAINT "StudentGrade_pkey" PRIMARY KEY ("userID", exam_id),
  CONSTRAINT "StudentGrade_exam_id_fkey" FOREIGN KEY (exam_id)
      REFERENCES "Exam" (exam_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "StudentGrade_userID_fkey" FOREIGN KEY ("userID")
      REFERENCES "User" (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "StudentGrade"
  OWNER TO dominozor;

-- Table: "Interest"

-- DROP TABLE "Interest";

CREATE TABLE "Interest"
(
  sitting_position character varying NOT NULL,
  att_situation double precision,
  course_name character varying(50) NOT NULL,
  "userID" character varying(8) NOT NULL,
  att_id character varying(20) NOT NULL,
  CONSTRAINT "Interest_pkey" PRIMARY KEY (att_id, "userID"),
  CONSTRAINT "Interest_att_id_fkey" FOREIGN KEY (att_id)
      REFERENCES "Attendance" (att_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "Interest_userID_fkey" FOREIGN KEY ("userID")
      REFERENCES "User" (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Interest"
  OWNER TO dominozor;

