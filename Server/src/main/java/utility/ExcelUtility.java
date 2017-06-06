package main.java.utility;

import main.java.models.Exam;
import main.java.models.StudentGrade;
import main.java.service.Service;
import main.java.service.ServiceImpl;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.jopendocument.dom.spreadsheet.*;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by enver on 3/7/17.
 */
public class ExcelUtility {


    Service service = new ServiceImpl().getInstance();


    private void excelIterator(Iterator<Row> iterator,String examID){
        double totalgrade=0;
        int gradeCount=0;
        while (iterator.hasNext()) {
            Row nextRow = iterator.next();
            Iterator<Cell> cellIterator = nextRow.cellIterator();
            int tmp=0;

            String userID=null;
            double grade=0;
            while (cellIterator.hasNext()) {
                Cell cell = cellIterator.next();

                if(tmp==0){
                    userID=(new Integer((int)cell.getNumericCellValue())).toString();
                }
                else {
                    grade=cell.getNumericCellValue();
                    gradeCount++;
                    totalgrade+=grade;
                }
                tmp++;

            }
            StudentGrade studentGrade=new StudentGrade(userID, examID, grade);
            service.addStudentGrade(studentGrade);
        }
        totalgrade=totalgrade/gradeCount;
        //System.out.println("totalgrade = " + totalgrade);
        Exam exam = service.getExam(examID);
        Exam ex=new Exam(examID, exam.getCourseID(), exam.getSectionNo(), exam.getType(), totalgrade, exam.getExamPercentage());
        service.updateExam(ex);
    }


    public boolean enterGradesXLS(String fileLocation, String examID){

        Workbook workbook = null;
        FileInputStream inputStream = null;
        try {
            inputStream = new FileInputStream(new File(fileLocation));
            workbook = new HSSFWorkbook(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        org.apache.poi.ss.usermodel.Sheet firstSheet = workbook.getSheetAt(0);
        Iterator<Row> iterator = firstSheet.iterator();
        iterator.next();
        excelIterator(iterator,examID);
        try {
            workbook.close();
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }


    public boolean enterGradesXLSX(String fileLocation, String examID){

        Workbook workbook = null;
        FileInputStream inputStream = null;
        try {
            inputStream = new FileInputStream(new File(fileLocation));
            workbook = new XSSFWorkbook(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        org.apache.poi.ss.usermodel.Sheet firstSheet = workbook.getSheetAt(0);
        Iterator<Row> iterator = firstSheet.iterator();
        iterator.next();
        excelIterator(iterator,examID);
        try {
            workbook.close();
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public boolean enterGradesODS(String fileLocation, String examID){
        org.jopendocument.dom.spreadsheet.Sheet sheet;
        HibernateUtility hUtility = new HibernateUtility();
        try {
            //Getting the 0th sheet for manipulation| pass sheet name as string
            sheet = SpreadSheet.createFromFile(new File(fileLocation)).getSheet(0);

            //Get row count and column count
            int nColCount = sheet.getColumnCount();
            int nRowCount = sheet.getRowCount();
            ArrayList gradeList = new ArrayList<StudentGrade>();

            //Iterating through each row of the selected sheet
            MutableCell cell = null;
            for(int nRowIndex = 1; nRowIndex < nRowCount; nRowIndex++)
            {
                //Iterating through each column
                int nColIndex = 0;
                String id=null;
                float grade=0;
                for( ;nColIndex < nColCount; nColIndex++)
                {
                    cell = sheet.getCellAt(nColIndex, nRowIndex);
                    if(nColIndex==0){
                        //id=Float.toString((float)cell.getValue());
                        id=String.format("%.0f",(float)cell.getValue() );
                    }
                    else{
                        grade=(float)cell.getValue();
                    }
                }
              gradeList.add(new StudentGrade(id,examID,grade));

            }
            hUtility.saveArr(gradeList);
            return true;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }
}
