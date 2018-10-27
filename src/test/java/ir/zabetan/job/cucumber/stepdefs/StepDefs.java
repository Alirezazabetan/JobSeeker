package ir.zabetan.job.cucumber.stepdefs;

import ir.zabetan.job.JobAngularApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = JobAngularApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
