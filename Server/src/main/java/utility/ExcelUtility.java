package main.java.utility;

import main.java.models.StudentGrade;
import main.java.service.Service;
import main.java.service.ServiceImpl;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;

/**
 * Created by enver on 3/7/17.
 */
public class ExcelUtility {


    Service service = new ServiceImpl().getInstance();

    public boolean enterGrades(String fileLocation, String examID){

        Workbook workbook = null;
        FileInputStream inputStream = null;
        try {
            inputStream = new FileInputStream(new File(fileLocation));
            workbook = new HSSFWorkbook(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        Sheet firstSheet = workbook.getSheetAt(0);
        Iterator<Row> iterator = firstSheet.iterator();
        iterator.next();
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
                else if(tmp==3){
                    grade=cell.getNumericCellValue();
                }
                tmp++;

            }
            StudentGrade studentGrade=new StudentGrade(userID, examID, grade);
            service.addStudentGrade(studentGrade);
        }
        try {
            workbook.close();
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}
